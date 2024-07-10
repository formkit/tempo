import { describe, it, expect } from "vitest"
import { addSecond } from "../addSecond"
process.env.TZ = "America/New_York"

describe("addSecond", () => {
  it("can increment a normal hour", () => {
    expect(addSecond("2022-01-01T00:00:00Z").toISOString()).toBe(
      "2022-01-01T00:00:01.000Z"
    )
  })
  it("can increment the last hours of the day into a new day", () => {
    expect(addSecond("2022-01-01T23:11:00Z", 3600 * 3 + 1).toISOString()).toBe(
      "2022-01-02T02:11:01.000Z"
    )
  })
  it("can decrement to the previous day of previous year by providing negative seconds count", () => {
    expect(addSecond("2022-01-01T00:00:30Z", -60).toISOString()).toBe(
      "2021-12-31T23:59:30.000Z"
    )
  })

  // test with the current time is at diffSeconds.
})
