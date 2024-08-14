import { describe, expect, it } from "vitest"
import { diff } from "../diff"
import { date } from "../date"
import { addSecond } from "../addSecond"
import { addDay } from "../addDay"

describe("diff", () => {
  it("should give 1 year, 3 months & 50 seconds", () => {
    const a = "2025-04-01 12:00:50"
    const b = "2024-01-01 12:00:00"
    expect(diff(a, b)).toEqual({ years: 1, months: 3, seconds: 50 })
  })

  it("should give -3 weeks, -6 days, -4 hours & -5 minutes", () => {
    const a = "2024-01-28 12:00:00"
    const b = "2024-01-01 07:55:00"

    expect(diff(b, a)).toEqual({ weeks: -3, days: -6, hours: -4, minutes: -5 })
  })

  it("should give abs 5 days & 5070 milliseconds from current time", () => {
    const a = date()
    const b = addDay(addSecond(a, 5), 5)

    expect(diff(a, b, { skip: ["seconds"], abs: true })).toEqual({
      days: 5,
      milliseconds: 5000,
    })
  })

  it("should give 18 months & 60 seconds while skipping years & minutes", () => {
    const a = "2025-07-01 12:01:00"
    const b = "2024-01-01 12:00:00"
    expect(diff(a, b, { skip: ["years", "minutes"] })).toEqual({
      months: 18,
      seconds: 60,
    })
  })

  it("should give 27 days and 245 minutes while using abs and skipping weeks and hours", () => {
    const a = "2024-01-28 12:00:00"
    const b = "2024-01-01 07:55:00"

    expect(diff(b, a, { abs: true, skip: ["weeks", "hours"] })).toEqual({
      days: 27,
      minutes: 245,
    })
  })
})
