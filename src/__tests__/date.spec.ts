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
    expect(date("2022-01-22T00:00-03:24").toISOString()).toBe(
      "2022-01-22T03:24:00.000Z"
    )
  })
  it("parses every shape iso8601() accepts (#94)", () => {
    expect(date("2023-05-05T07:30:10+05:32:11").toISOString()).toBe(
      "2023-05-05T01:57:59.000Z"
    )
    expect(date("2023-05-05T07:30:10-05:32:11").toISOString()).toBe(
      "2023-05-05T13:02:21.000Z"
    )
    expect(date("2024-01-01Z").toISOString()).toBe("2024-01-01T00:00:00.000Z")
    expect(date("2024-01-01T10").getTime()).toBe(
      new Date(2024, 0, 1, 10).getTime()
    )
    expect(date("2024-01-01T10:00+0530").toISOString()).toBe(
      "2024-01-01T04:30:00.000Z"
    )
    expect(date("2024-01-01T10:00:00.25Z").toISOString()).toBe(
      "2024-01-01T10:00:00.250Z"
    )
    expect(date("2024-03").getTime()).toBe(new Date(2024, 2, 1).getTime())
  })
})
