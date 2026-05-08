import { describe, expect, it } from "vitest"
import { setDayOfMonth } from "../setDayOfMonth"
import { date } from "../date"

describe("setMinutes", () => {
  it("should set the minute", () => {
    expect(setDayOfMonth("2024-05-06", 20)).toEqual(date("2024-05-20"))
  })

  it("shouldn't overflow to the next month", () => {
    expect(setDayOfMonth("2024-06-04", 31)).toEqual(date("2024-06-30"))
  })

  it("shouldn't overflow to the next month with Feb", () => {
    expect(setDayOfMonth("2023-02-20", 31)).toEqual(date("2023-02-28"))
  })

  it("shouldn't overflow to the next month with Feb leap", () => {
    expect(setDayOfMonth("2024-02-20", 31)).toEqual(date("2024-02-29"))
  })

  it("should overflow when allowing overflow", () => {
    expect(setDayOfMonth("2024-07-28", 35, true)).toEqual(date("2024-08-04"))
  })

  it("should underflow when given a negative number", () => {
    expect(setDayOfMonth("2024-07-20 ", -3)).toEqual(date("2024-06-27"))
  })

  it("should set day to the 3th from current month", () => {
    const d = date()
    d.setDate(3)
    expect(setDayOfMonth(null, 3)).toEqual(d)
  })
})
