import { describe, it, expect } from "vitest"
import { tzDate } from "../tzDate"
process.env.TZ = "America/New_York"

describe("tzDate", () => {
  it("can can parse an unzoned/offset iso8601 as if it was in a timezone", () => {
    expect(tzDate("2017-05-06T12:00", "Europe/Amsterdam").toISOString()).toBe(
      "2017-05-06T18:00:00.000Z"
    )
  })

  it(`correctly calculates time difference between "${process.env.TZ}" and "Asia/Ho_Chi_Minh"`, () => {
    const result = tzDate("2024-03-07T02:00", "Asia/Ho_Chi_Minh").toISOString()
    expect(result).toBe("2024-03-07T14:00:00.000Z")
  })

  it(`correctly calculates time difference between "${process.env.TZ}" and "Australia/Sydney"`, () => {
    const result = tzDate("2024-03-07T02:00", "Australia/Sydney").toISOString()
    expect(result).toBe("2024-03-07T18:00:00.000Z")
  })
})
