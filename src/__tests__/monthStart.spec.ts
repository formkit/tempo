import { describe, it, expect } from "vitest"
import { monthStart } from "../monthStart"
process.env.TZ = "America/New_York"

describe("monthStart", () => {
  it("gets the first of a month from the middle of the month", () => {
    expect(monthStart("1986-03-17T00:00:00Z").toISOString()).toBe(
      "1986-03-01T05:00:00.000Z"
    )
  })
  it("gets the first day of the previous month when the time is in UTC", () => {
    expect(monthStart("2000-01-01T00:00:00Z").toISOString()).toBe(
      "1999-12-01T05:00:00.000Z"
    )
  })
  it("gets the first day of the current month when the time is local", () => {
    expect(monthStart("2000-01-01T00:00:00").toISOString()).toBe(
      "2000-01-01T05:00:00.000Z"
    )
  })
})
