import { describe, it, expect } from "vitest"
import { yearStart } from "../yearStart"

describe("yearStart", () => {
  it("can become the start of the year", () => {
    expect(yearStart("2023-02-22T12:00:00Z").toISOString()).toBe(
      "2023-01-01T05:00:00.000Z"
    )
  })
})
