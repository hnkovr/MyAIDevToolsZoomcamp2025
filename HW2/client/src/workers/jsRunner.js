self.onmessage = (e) => {
  const code = (e && e.data && e.data.code) || ''
  try {
    const logs = []
    const origLog = console.log
    console.log = (...args) => logs.push(args.map(String).join(' '))
    let result
    try {
      // eslint-disable-next-line no-eval
      result = eval(code)
    } finally {
      console.log = origLog
    }
    if (result !== undefined) logs.push(String(result))
    self.postMessage({ ok: true, output: logs.join('\n') })
  } catch (err) {
    self.postMessage({ ok: false, output: `Error: ${err && err.message ? err.message : String(err)}` })
  }
}

