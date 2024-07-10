import { describe, expect, it } from "vitest"
import { date } from "../date"
import { monthDays } from "../monthDays"
process.env.TZ = "America/New_York"

describe("monthDays", () => {
  it("gets the correct number of december days", () => {
    expect(monthDays("2020-12-01")).toBe(31)
  })
  it("gets the correct number of april days", () => {
    expect(monthDays("2020-04-01")).toBe(30)
  })
  it("gets the correct number of Feb days on non leap years", () => {
    expect(monthDays("2022-02-01")).toBe(28)
  })
  it("gets the correct number of Feb days on leap years", () => {
    expect(monthDays("2020-02-01")).toBe(29)
  })

  it("gets the amount of days of the current month", () => {
    const compare = date()
    compare.setMonth(compare.getMonth() + 1, 0) // the 0 wraps to the last day of the previous month
    expect(monthDays()).toBe(compare.getDate())
  })
})
