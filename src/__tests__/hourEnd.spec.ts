import { describe, it, expect } from "vitest"
import { hourEnd } from "../hourEnd"
process.env.TZ = "America/New_York"

describe("hourEnd", () => {
  it("can become the end of the hour", () => {
    expect(hourEnd("2023-02-22T12:30:00Z").toISOString()).toBe(
      "2023-02-22T17:59:59.999Z"
    )
  })
})
