/**
 * Preprocess source code examples for use in the playground. This allows us to
 * use actual import statements, and also wrap all the functions a logging
 * system so we get repl like behavior.
 *
 * @param rawSource - Source code to process
 */
export function processPlaygroundCode(rawSource: string): string {
  const fns = new Set<string>()
  // Replace the import statement with a dynamic import, and create a set of
  // functions that we are importing from tempo.
  let code = "try {"
  code += rawSource.replace(
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

  code = wrapFunctions(code, [...fns, "console.log"], "logOut")

  // Replace any api statements with a wrapped log statement with the line
  // number explicitly added in.

  return `(async () => { ${code} } catch (e) { logError(e) } })()`
}

/**
 * Parses javascript code and wraps all the functions in the fns array with the
 * wrapFn function call. The wrapFn function call will be passed the line number
 * of the function call as the first argument. This is useful for logging out
 * results of the function calls in the playground.
 *
 * This function is not perfect, but much small and faster than a full AST
 * parser and manipulator.
 *
 * @param code - Source code to wrap
 * @param fns - List of functions to wrap
 * @param wrapFn - Wrap all the above functions in this function call
 */
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

/**
 * Checks if the next character could be part of a function name.
 *
 * @param char - The character to check
 * @param currentFnStr - The current function string we are building
 * @param fns - The list of functions we are looking for
 * @param possibleFns - List of functions we have narrowed it down to
 */
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
