import { afterEach, describe, expect, it, vi } from "vitest"
import { add, addDay, addSecond, date, diff } from "../index"

afterEach(() => {
  vi.useRealTimers()
})

function expectAllPositive(duration: Record<string, number>) {
  expect(Object.values(duration).every((value) => value > 0)).toBe(true)
}

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

  it("does not emit mixed signs when calendar units clamp", () => {
    const duration = diff("2025-02-28", "2024-02-29", { abs: true })

    expect(duration).toEqual({
      months: 11,
      weeks: 3,
      days: 7,
    })
    expectAllPositive(duration)
  })

  it("keeps leap-day calendar boundary durations round-trippable", () => {
    const start = "2024-02-29"
    const end = "2025-02-28"

    expect(add(start, diff(end, start))).toEqual(date(end))
    expect(add(end, diff(start, end))).toEqual(date(start))
  })

  it("uses days instead of negative fields when weeks are skipped", () => {
    const duration = diff("2025-02-28", "2024-02-29", { skip: ["weeks"] })

    expect(duration).toEqual({
      months: 11,
      days: 27,
      hours: 24,
    })
    expectAllPositive(duration)
    expect(add("2024-02-29", duration)).toEqual(date("2025-02-28"))
  })
})
