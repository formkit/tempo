import { describe, it, expect } from "vitest"
import { addHour } from "../addHour"
process.env.TZ = "America/New_York"

describe("addHour", () => {
  it("can increment a normal hour", () => {
    expect(addHour("2022-01-01T00:00:00Z").toISOString()).toBe("2022-01-01T01:00:00.000Z")
  })
  it("can increment the last hours of the day into a new day", () => {
    expect(addHour("2022-01-01T23:11:00Z", 3).toISOString()).toBe(
      "2022-01-02T02:11:00.000Z"
    )
  })
  it("can decrement to the previous day of previous year by providing negative number of hours", () => {
    expect(addHour("2022-01-01T01:11:00Z", -6).toISOString()).toBe(
      "2021-12-31T19:11:00.000Z"
    )
  })

  // test with the current time is at diffHours.
})
