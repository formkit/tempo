import { describe, it, expect } from "vitest"
import { addMonth } from "../addMonth"
process.env.TZ = "America/New_York"

describe("addMonth", () => {
  it("gets the next month on the first", () => {
    expect(addMonth("2022-01-01").toISOString()).toBe("2022-02-01T05:00:00.000Z")
  })
  it("can overflow a month month when the next month has fewer days", () => {
    expect(addMonth("2000-01-31", 1, true).toISOString()).toBe("2000-03-02T05:00:00.000Z")
  })
  it("goe to the same day of the month on the next month", () => {
    expect(addMonth("2000-06-04").toISOString()).toBe("2000-07-04T04:00:00.000Z")
  })

  it("can add multiple months by passing a second argument", () => {
    expect(addMonth("2000-01-01", 2).toISOString()).toBe("2000-03-01T05:00:00.000Z")
  })

  it("can add years months by passing a second argument", () => {
    expect(addMonth("2000-01-01", 25).toISOString()).toBe("2002-02-01T05:00:00.000Z")
  })
  it("can prevent month overflow with third argument", () => {
    expect(addMonth("2020-01-31", 1, false).toISOString()).toBe(
      "2020-02-29T05:00:00.000Z"
    )
  })
  it("can subtract multiple months", () => {
    expect(addMonth("2020-01-31", -2).toISOString()).toBe("2019-11-30T05:00:00.000Z")
  })
  it("can subtract multiple months and allow overflow", () => {
    expect(addMonth("2020-01-31", -2, true).toISOString()).toBe(
      "2019-12-01T05:00:00.000Z"
    )
  })

  // test with current time is at diffMonths.
})
