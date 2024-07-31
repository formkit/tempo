import { describe, it, expect } from "vitest"
import { weekEnd } from "../weekEnd"
process.env.TZ = "America/New_York"

describe("weekEnd", () => {
  it("gets the last day of the week", () => {
    expect(weekEnd("2022-11-28T00:00:00").toISOString()).toBe("2022-12-04T04:59:59.000Z")
  })
  it("gets the last day of the week when offset to tuesday", () => {
    expect(weekEnd("2022-07-08T00:00:00", 2).toISOString()).toBe(
      "2022-07-12T03:59:59.000Z"
    )
  })
  it("gets the last day of the week when offset to wednesday and the day is thursday", () => {
    expect(weekEnd("2022-10-13", 3).toISOString()).toBe("2022-10-19T03:59:59.000Z")
  })
  it("gets the last day of the week when offset to wednesday and the day is monday", () => {
    expect(weekEnd("2022-10-10", 3).toISOString()).toBe("2022-10-12T03:59:59.000Z")
  })

  it("gets the first day of the current week", () => {
    const compare = new Date()
    compare.setDate(compare.getDate() - compare.getDay() + 6)
    compare.setHours(23, 59, 59, 0)
    expect(weekEnd()).toEqual(compare)
  })
})
