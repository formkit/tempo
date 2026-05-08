import { afterEach, describe, expect, it, vi } from "vitest"
import { addDay, addSecond, date, diff } from "../index"

afterEach(() => {
  vi.useRealTimers()
})

describe("diff", () => {
  it("returns a duration with calendar and time units", () => {
    expect(diff("2025-04-01 12:00:50", "2024-01-01 12:00:00")).toEqual({
      years: 1,
      months: 3,
      seconds: 50,
    })
  })

  it("returns negative duration units", () => {
    const a = "2024-01-28 12:00:00"
    const b = "2024-01-01 07:55:00"

    expect(diff(b, a)).toEqual({ weeks: -3, days: -6, hours: -4, minutes: -5 })
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-01-01 12:00:00"))
    const b = addDay(addSecond(null, 5), 5)

    expect(diff(null, b, { skip: ["seconds"], abs: true })).toEqual({
      days: 5,
      milliseconds: 5000,
    })
  })

  it("can skip duration units with an array", () => {
    expect(
      diff("2025-07-01 12:01:00", "2024-01-01 12:00:00", {
        skip: ["years", "minutes"],
      })
    ).toEqual({
      months: 18,
      seconds: 60,
    })
  })

  it("can skip duration units with a set", () => {
    expect(
      diff("2025-07-01 12:01:00", "2024-01-01 12:00:00", {
        skip: new Set(["years", "minutes"]),
      })
    ).toEqual({
      months: 18,
      seconds: 60,
    })
  })

  it("can return absolute duration units", () => {
    const a = "2024-01-28 12:00:00"
    const b = "2024-01-01 07:55:00"

    expect(diff(b, a, { abs: true, skip: ["weeks", "hours"] })).toEqual({
      days: 27,
      minutes: 245,
    })
  })
})
