import { describe, it, expect } from "vitest"
import { applyOffset } from "../applyOffset"
process.env.TZ = "America/New_York"

describe("applyOffset", () => {
  it("can apply a negative offset to a date", () => {
    expect(applyOffset("2023-02-22T00:00:00Z", "-0500").toISOString()).toBe(
      "2023-02-21T19:00:00.000Z"
    )
  })

  it("can apply a positive offset to a date", () => {
    expect(applyOffset("2023-04-13T10:15:00", "+0200").toISOString()).toBe(
      "2023-04-13T16:15:00.000Z"
    )
  })
})
