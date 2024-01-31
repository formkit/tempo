async function loadTempo() {
  return await import("@formkit/tempo")
}

function logOut(lineNumber: number, value: unknown) {
  self.postMessage({ lineNumber, value })
}

self.onmessage = function (event) {
  eval(event.data)
}
