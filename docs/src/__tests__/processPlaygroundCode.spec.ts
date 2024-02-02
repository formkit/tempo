import { describe, it, expect } from "vitest"
import { processPlaygroundCode } from "../processPlaygroundCode"

describe("import replacements", () => {
  it("can replace imports with dynamic imports", () => {
    expect(processPlaygroundCode(`import { foo } from '@formkit/tempo'`)).toBe(
      `(async () => { try {const { foo } = await loadTempo() } catch (e) { logError(e) } })()`
    )
  })

  it("can replace multiple imports with dynamic imports", () => {
    expect(
      processPlaygroundCode(`import { foo, bar, baz } from '@formkit/tempo'`)
    ).toBe(
      `(async () => { try {const { foo, bar, baz } = await loadTempo() } catch (e) { logError(e) } })()`
    )
  })

  it("can replace a renamed import", () => {
    expect(
      processPlaygroundCode(`import { foo as bar } from '@formkit/tempo'`)
    ).toBe(
      `(async () => { try {const { foo:bar } = await loadTempo() } catch (e) { logError(e) } })()`
    )
  })

  it("can replace multiple renamed imports", () => {
    expect(
      processPlaygroundCode(
        `import { foo as bar, biz as bim } from '@formkit/tempo'`
      )
    ).toBe(
      `(async () => { try {const { foo:bar, biz:bim } = await loadTempo() } catch (e) { logError(e) } })()`
    )
  })

  it("can import all of tempo", () => {
    expect(processPlaygroundCode(`import * as foo from '@formkit/tempo'`)).toBe(
      `(async () => { try {const foo = await loadTempo() } catch (e) { logError(e) } })()`
    )
  })
})

describe("log replacements", () => {
  it("can wrap a root level function call", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
foo()`)
    ).toBe(`(async () => { try {const { foo } = await loadTempo()
logOut(1, foo()) } catch (e) { logError(e) } })()`)
  })

  it("does not wrap un imported functions", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
bar(foo())`)
    ).toBe(`(async () => { try {const { foo } = await loadTempo()
bar(logOut(1, foo())) } catch (e) { logError(e) } })()`)
  })

  it("does not wrap calls inside strings", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
bar("foo()")`)
    ).toBe(`(async () => { try {const { foo } = await loadTempo()
bar("foo()") } catch (e) { logError(e) } })()`)
  })

  it("wraps calls after strings", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
bar("foo()", foo())`)
    ).toBe(`(async () => { try {const { foo } = await loadTempo()
bar("foo()", logOut(1, foo())) } catch (e) { logError(e) } })()`)
  })

  it("can perform multiple wraps", () => {
    expect(
      processPlaygroundCode(`import { foo, bar, baz } from '@formkit/tempo'
foo("bar()", bar(
  ting(baz  ( bing())))
)`)
    ).toBe(`(async () => { try {const { foo, bar, baz } = await loadTempo()
logOut(1, foo("bar()", logOut(1, bar(
  ting(logOut(2, baz  ( bing())))))
)) } catch (e) { logError(e) } })()`)
  })

  it("can wrap inside a loop", () => {
    expect(
      processPlaygroundCode(`import { parse, format } from "@formkit/tempo"
for (let i; i<5; i++) {
    format('2012-01-01', 'YYYY')
}
`)
    ).toBe(`(async () => { try {const { parse, format } = await loadTempo()
for (let i; i<5; i++) {
    logOut(2, format('2012-01-01', 'YYYY'))
}
 } catch (e) { logError(e) } })()`)
  })

  it("wrap a console.log", () => {
    expect(processPlaygroundCode("const x = 123\nconsole.log(x)")).toBe(
      `(async () => { try {const x = 123\nlogOut(1, console.log(x)) } catch (e) { logError(e) } })()`
    )
  })
})
