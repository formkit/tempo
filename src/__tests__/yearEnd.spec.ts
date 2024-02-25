import { describe, it, expect } from "vitest"
import { yearEnd } from "../yearEnd"

describe("yearEnd", () => {
  it("can become the end of the year", () => {
    expect(yearEnd("2023-02-22T12:00:00Z").toISOString()).toBe(
      "2024-01-01T04:59:59.999Z"
    )
  })
})
