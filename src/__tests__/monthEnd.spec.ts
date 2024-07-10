import { describe, it, expect } from "vitest"
import { monthEnd } from "../monthEnd"
import { date } from "../date"
process.env.TZ = "America/New_York"

describe("monthEnd", () => {
  it("gets the correct last day of Feb on leap years", () => {
    expect(monthEnd("2020-02-01").toISOString()).toBe("2020-02-29T05:00:00.000Z")
  })
  it("gets the correct last day of August", () => {
    expect(monthEnd("1999-08-01").toISOString()).toBe("1999-08-31T04:00:00.000Z")
  })
  it("gets the correct last day when starting from the last day", () => {
    expect(monthEnd("2020-01-31T05:00:00.000Z").toISOString()).toBe(
      "2020-01-31T05:00:00.000Z"
    )
  })
  it("gets the correct last day when starting from the last day", () => {
    expect(monthEnd("2020-01-31T05:00:00.000Z").toISOString()).toBe(
      "2020-01-31T05:00:00.000Z"
    )
  })

  it("gets the last day of the current month", () => {
    const compare = date()
    compare.setMonth(compare.getMonth() + 1, 0)
    expect(monthEnd()).toEqual(compare)
  })
})
