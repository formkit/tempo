async function loadTempo() {
  return await import("@formkit/tempo")
}

function logOut(lineNumber: number, value: unknown) {
  self.postMessage({ lineNumber, value })
  return value
}

function logError(error: Error) {
  self.postMessage({ error: error.message })
}

self.onmessage = function (event) {
  eval(event.data)
}
