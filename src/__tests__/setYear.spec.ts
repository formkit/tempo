import { afterEach, describe, expect, it, vi } from "vitest"
import { setYear } from "../setYear"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("setYear", () => {
  it("sets the year", () => {
    expect(setYear("2010-06-29", 1998)).toEqual(date("1998-06-29"))
  })

  it("prevents day overflow from leap years to non-leap years", () => {
    expect(setYear("2024-02-29", 2023)).toEqual(date("2023-02-28"))
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-06-29 10:15:30.400"))

    expect(setYear(null, 2017)).toEqual(date("2017-06-29 10:15:30.400"))
  })
})
