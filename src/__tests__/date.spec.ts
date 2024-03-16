import { describe, it, expect } from "vitest"
import { date } from "../date"

process.env.TZ = "America/New_York"
describe("date", () => {
  it("qualifies and re-timezones a date", () => {
    expect(date("2022-01-22 00:00:00").toISOString()).toBe(
      "2022-01-22T05:00:00.000Z"
    )
  })
  it("accepts a time with a timezone offset", () => {
    expect(date("2022-01-22T00:00-0300").toISOString()).toBe(
      "2022-01-22T03:00:00.000Z"
    )
    expect(date("2022-01-22T00:00-03:00").toISOString()).toBe(
      "2022-01-22T03:00:00.000Z"
    )
  })
})
