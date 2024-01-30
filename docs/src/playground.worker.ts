async function loadTempo() {
  return await import("@formkit/tempo")
}

function logOut(...args: string[]) {
  self.postMessage(args.join(", "))
}
self.onmessage = function (event) {
  eval(event.data)
}
