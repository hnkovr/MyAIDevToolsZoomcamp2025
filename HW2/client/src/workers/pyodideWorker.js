/* classic worker to load Pyodide from CDN */
self.onmessage = async (e) => {
  const data = e && e.data
  if (!data) return
  if (data.type === 'init') {
    try {
      // Pin a version that is known stable
      self.importScripts('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js')
      // @ts-ignore
      self.pyodide = await self.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })
      self.postMessage({ type: 'ready' })
    } catch (err) {
      self.postMessage({ type: 'result', ok: false, output: `Pyodide init error: ${String(err)}` })
    }
  } else if (data.type === 'run') {
    try {
      // @ts-ignore
      const result = await self.pyodide.runPythonAsync(data.code)
      self.postMessage({ type: 'result', ok: true, output: String(result ?? '') })
    } catch (err) {
      self.postMessage({ type: 'result', ok: false, output: String(err) })
    }
  }
}

