const noop = Symbol()
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

function consoleOut(
  type: "log" | "error" | "warn" | "info" | symbol,
  ...args: unknown[]
) {
  if (typeof type !== "string") return
  console[type](...args)
  return args.join(", ")
}

class Playground {
  init() {
    self.onmessage = async (event) => {
      eval(event.data)
    }
  }
  dummy() {
    loadTempo()
    logOut(0, "")
    logError(new Error(""))
    consoleOut(noop)
  }
}

new Playground().init()
