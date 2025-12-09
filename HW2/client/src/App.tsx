import React, { useEffect, useMemo, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'

type Lang = 'javascript' | 'python'

const serverUrl = (import.meta as any).env?.VITE_API_BASE || window.location.origin

function getOrCreateSessionId() {
  const url = new URL(window.location.href)
  let s = url.searchParams.get('s')
  if (!s) {
    s = Math.random().toString(36).slice(2, 10)
    url.searchParams.set('s', s)
    history.replaceState(null, '', url.toString())
  }
  return s
}

export default function App() {
  const [lang, setLang] = useState<Lang>('javascript')
  const [code, setCode] = useState<string>('// Write some code\nconsole.log("Hello")')
  const [output, setOutput] = useState<string>('')
  const [sessionId] = useState<string>(getOrCreateSessionId())
  const socketRef = useRef<Socket | null>(null)
  const applyingRemoteRef = useRef(false)

  useEffect(() => {
    const socket = io(serverUrl, { transports: ['websocket'] })
    socketRef.current = socket
    socket.on('connect', () => {
      socket.emit('join', sessionId)
    })
    socket.on('code:update', (payload: any) => {
      if (typeof payload?.code === 'string') {
        applyingRemoteRef.current = true
        setCode(payload.code)
        setTimeout(() => (applyingRemoteRef.current = false), 0)
      }
      if (payload?.lang) setLang(payload.lang as Lang)
    })
    return () => {
      socket.disconnect()
    }
  }, [sessionId])

  const extensions = useMemo(() => {
    return lang === 'javascript' ? [javascript()] : [python()]
  }, [lang])

  const onChange = (value: string) => {
    setCode(value)
    if (applyingRemoteRef.current) return
    socketRef.current?.emit('code:update', { sessionId, code: value, lang })
  }

  const runCode = async () => {
    setOutput('Running...')
    if (lang === 'javascript') {
      const res = await runJS(code)
      setOutput(res.output)
    } else {
      const res = await runPy(code)
      setOutput(res.output)
    }
  }

  const shareUrl = window.location.href

  return (
    <div style={{ maxWidth: 960, margin: '1rem auto', padding: '0 1rem', fontFamily: 'ui-sans-serif, system-ui' }}>
      <h2>Realtime Coding Interview</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <label>Session:</label>
        <code>{sessionId}</code>
        <button onClick={() => navigator.clipboard.writeText(shareUrl)}>Copy Link</button>
        <label style={{ marginLeft: 'auto' }}>Lang:</label>
        <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button onClick={runCode}>Run</button>
      </div>
      <CodeMirror value={code} height="400px" extensions={extensions} onChange={onChange} basicSetup={{ lineNumbers: true }} />
      <div style={{ marginTop: 12 }}>
        <h3>Output</h3>
        <pre style={{ background: '#f5f5f5', padding: 12, minHeight: 120, overflowX: 'auto' }}>{output}</pre>
      </div>
    </div>
  )
}

async function runJS(source: string): Promise<{ ok: boolean; output: string }> {
  return new Promise((resolve) => {
    const worker = new Worker(new URL('./workers/jsRunner.js', import.meta.url), { type: 'module' })
    const to = setTimeout(() => {
      worker.terminate()
      resolve({ ok: false, output: 'Timeout' })
    }, 5000)
    worker.onmessage = (e) => {
      clearTimeout(to)
      worker.terminate()
      resolve({ ok: e.data?.ok, output: e.data?.output ?? '' })
    }
    worker.postMessage({ code: source })
  })
}

let pyWorker: Worker | null = null
let pyReady = false
function ensurePyWorker() {
  if (!pyWorker) {
    pyWorker = new Worker(new URL('./workers/pyodideWorker.js', import.meta.url))
    pyWorker.onmessage = (e) => {
      if (e.data?.type === 'ready') pyReady = true
    }
    pyWorker.postMessage({ type: 'init' })
  }
}

async function runPy(source: string): Promise<{ ok: boolean; output: string }> {
  ensurePyWorker()
  return new Promise((resolve) => {
    const waitReady = setInterval(() => {
      if (pyReady) {
        clearInterval(waitReady)
        const to = setTimeout(() => resolve({ ok: false, output: 'Timeout' }), 8000)
        pyWorker!.onmessage = (e) => {
          if (e.data?.type === 'result') {
            clearTimeout(to)
            resolve({ ok: e.data.ok, output: e.data.output })
          }
        }
        pyWorker!.postMessage({ type: 'run', code: source })
      }
    }, 100)
  })
}
