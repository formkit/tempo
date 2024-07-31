import { describe, it, expect } from "vitest"
import { dayEnd } from "../dayEnd"
process.env.TZ = "America/New_York"

describe("dayEnd", () => {
  it("can become the end of the day", () => {
    expect(dayEnd("2023-02-22T12:00:00Z").toISOString()).toBe("2023-02-23T04:59:59.999Z")
  })
  it("can become the end of the current day", () => {
    const compare = new Date()
    compare.setHours(23, 59, 59, 999)
    expect(dayEnd()).toEqual(compare)
  })
})
