import { describe, expect, it } from "vitest"
import { add, date, diff } from "../index"

describe("add", () => {
  it("adds multiple duration units", () => {
    expect(
      add("2024-01-01 12:00:00", {
        years: 1,
        months: 3,
        days: 15,
        hours: 2,
        minutes: 8,
        seconds: 40,
      })
    ).toEqual(date("2025-04-16 14:08:40"))
  })

  it("allows month overflow when requested", () => {
    expect(add("2024-01-30", { months: 1 }, true)).toEqual(date("2024-03-01"))
  })

  it("adds weeks and milliseconds", () => {
    expect(add("2024-02-05 10:00:00.250", { weeks: -5, milliseconds: 100 })).toEqual(
      date("2024-01-01 10:00:00.350")
    )
  })

  it("round-trips a positive duration returned by diff", () => {
    const start = "2024-01-30"
    const end = "2024-03-01"

    expect(add(start, diff(end, start))).toEqual(date(end))
  })

  it("round-trips a negative duration returned by diff", () => {
    const start = "2024-01-30"
    const end = "2024-03-01"

    expect(add(end, diff(start, end))).toEqual(date(start))
  })
})
