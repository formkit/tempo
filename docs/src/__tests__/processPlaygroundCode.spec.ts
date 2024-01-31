import { describe, it, expect } from "vitest"
import { processPlaygroundCode } from "../processPlaygroundCode"

describe("import replacements", () => {
  it("can replace imports with dynamic imports", () => {
    expect(processPlaygroundCode(`import { foo } from '@formkit/tempo'`)).toBe(
      `(async () => { const { foo } = await loadTempo() })()`
    )
  })

  it("can replace multiple imports with dynamic imports", () => {
    expect(
      processPlaygroundCode(`import { foo, bar, baz } from '@formkit/tempo'`)
    ).toBe(`(async () => { const { foo, bar, baz } = await loadTempo() })()`)
  })

  it("can replace a renamed import", () => {
    expect(
      processPlaygroundCode(`import { foo as bar } from '@formkit/tempo'`)
    ).toBe(`(async () => { const { foo:bar } = await loadTempo() })()`)
  })

  it("can replace multiple renamed imports", () => {
    expect(
      processPlaygroundCode(
        `import { foo as bar, biz as bim } from '@formkit/tempo'`
      )
    ).toBe(`(async () => { const { foo:bar, biz:bim } = await loadTempo() })()`)
  })

  it("can import all of tempo", () => {
    expect(processPlaygroundCode(`import * as foo from '@formkit/tempo'`)).toBe(
      `(async () => { const foo = await loadTempo() })()`
    )
  })
})

describe("log replacements", () => {
  it("can wrap a root level function call", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
foo()`)
    ).toBe(`(async () => { const { foo } = await loadTempo()
logOut(1, foo()) })()`)
  })

  it("does not wrap un imported functions", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
bar(foo())`)
    ).toBe(`(async () => { const { foo } = await loadTempo()
bar(logOut(1, foo())) })()`)
  })

  it("does not wrap calls inside strings", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
bar("foo()")`)
    ).toBe(`(async () => { const { foo } = await loadTempo()
bar("foo()") })()`)
  })

  it("wraps calls after strings", () => {
    expect(
      processPlaygroundCode(`import { foo } from '@formkit/tempo'
bar("foo()", foo())`)
    ).toBe(`(async () => { const { foo } = await loadTempo()
bar("foo()", logOut(1, foo())) })()`)
  })

  it("can perform multiple wraps", () => {
    expect(
      processPlaygroundCode(`import { foo, bar, baz } from '@formkit/tempo'
foo("bar()", bar(
  ting(baz  ( bing())))
)`)
    ).toBe(`(async () => { const { foo, bar, baz } = await loadTempo()
logOut(1, foo("bar()", logOut(1, bar(
  ting(logOut(2, baz  ( bing())))))
)) })()`)
  })

  it("can perform multiple wraps", () => {
    expect(
      processPlaygroundCode(`import { parse, format } from "@formkit/tempo"
for (let i; i<5; i++) {
    format('2012-01-01', 'YYYY')
}
`)
    ).toBe(`(async () => { const { parse, format } = await loadTempo()
for (let i; i<5; i++) {
    logOut(2, format('2012-01-01', 'YYYY'))
}
 })()`)
  })
})
