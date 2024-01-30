export function processPlaygroundCode(rawSource: string): string {
  const fns = new Set<string>()
  // Replace the import statement with a dynamic import, and create a set of
  // functions that we are importing from tempo.
  let code = rawSource.replace(
    /import(?:\s+)?{(.*)}(?:\s+)?from(?:\s+)?["']@formkit\/tempo['"]/,
    function replacer(_: string, p1: string) {
      const imports = p1.replace(
        /(.*?)(?:\s+)?as(?:\s+)?(.*?),?/g,
        function (_, original: string, replacement: string) {
          return `${original}:${replacement}`
        }
      )
      imports.split(",").forEach((imp) => {
        if (imp.includes(":")) {
          const [, replacement] = imp.split(":")
          fns.add(replacement.trim())
        } else {
          fns.add(imp.trim())
        }
      })
      return `const { ${imports.trim()} } = await loadTempo()`
    }
  )
  code = code.replace(
    /import(?:\s+)?\*(?:\s+)?as(?:\s+)?(.*?)from(\s+)?['"]@formkit\/tempo['"]/g,
    function replacer(_: string, p1: string) {
      fns.add(p1.trim())
      return `const ${p1.trim()} = await loadTempo()`
    }
  )

  code = wrapFunctions(code, [...fns], "logOut")

  // Replace any api statements with a wrapped log statement with the line
  // number explicitly added in.

  return `(async () => { ${code} })()`
}

function wrapFunctions(code: string, fns: string[], wrapFn: string): string {
  const chars = [...code]
  let quote = ""
  let lineNumber = 0
  let possibleFns: string[] = []
  let fn = ""
  let currentFnStr = ""
  let callDepth = 0
  let closeAtDepth: number[] = []
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i]

    if (char === "\n") {
      lineNumber++
    }
    if (char === quote) {
      quote = ""
    } else if (/['"`]/.test(char)) {
      quote = char
    } else if (!quote) {
      possibleFns = isNextChar(char, currentFnStr, fns, possibleFns)
      if (possibleFns.length) {
        currentFnStr += char
        if (fns.includes(currentFnStr)) {
          fn = currentFnStr
        }
      } else if (char === "(") {
        if (fn) {
          closeAtDepth.unshift(callDepth)
          const inject = [...`${wrapFn}(${lineNumber}, `]
          chars.splice(i - fn.length, 0, ...inject)
          i += inject.length
          possibleFns = []
          fn = ""
          currentFnStr = ""
        }
        callDepth++
        // We've found a tempo function, so we need to wrap it in a log
      } else if (char === ")") {
        callDepth--
        if (closeAtDepth[0] === callDepth) {
          chars.splice(i + 1, 0, ")")
          fn = ""
          currentFnStr = ""
          possibleFns = []
          closeAtDepth.shift()
          i += 1
        }
      } else if (fn && /\s/.test(char)) {
        fn += char // white space doesnt matter but we do need it for positioning
      } else {
        fn = "" // reset
        currentFnStr = "" // reset
        possibleFns = []
      }
    }
  }
  return chars.join("")
}

function isNextChar(
  char: string,
  currentFnStr: string,
  fns: string[],
  possibleFns: string[]
): string[] {
  const setToUse = currentFnStr ? possibleFns : fns
  const str = currentFnStr + char
  return setToUse.filter((fn) => fn.startsWith(str))
}
