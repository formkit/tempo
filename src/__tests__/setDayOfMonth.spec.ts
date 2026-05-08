import { afterEach, describe, expect, it, vi } from "vitest"
import { setDayOfMonth } from "../setDayOfMonth"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("setDayOfMonth", () => {
  it("sets the day of the month", () => {
    expect(setDayOfMonth("2024-05-06", 20)).toEqual(date("2024-05-20"))
  })

  it("clamps to the last day when the target month is shorter", () => {
    expect(setDayOfMonth("2024-06-04", 31)).toEqual(date("2024-06-30"))
  })

  it("clamps to the last day of February in non-leap years", () => {
    expect(setDayOfMonth("2023-02-20", 31)).toEqual(date("2023-02-28"))
  })

  it("clamps to the last day of February in leap years", () => {
    expect(setDayOfMonth("2024-02-20", 31)).toEqual(date("2024-02-29"))
  })

  it("allows overflow when requested", () => {
    expect(setDayOfMonth("2024-07-28", 35, true)).toEqual(date("2024-08-04"))
  })

  it("allows underflow", () => {
    expect(setDayOfMonth("2024-07-20", -3)).toEqual(date("2024-06-27"))
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-07-20 10:15:30.400"))

    expect(setDayOfMonth(null, 3)).toEqual(date("2024-07-03 10:15:30.400"))
  })
})
