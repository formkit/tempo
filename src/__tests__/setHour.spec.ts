import { afterEach, describe, expect, it, vi } from "vitest"
import { setHour } from "../setHour"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("setHour", () => {
  it("sets the hour", () => {
    expect(setHour("2024-05-06 10:37", 17)).toEqual(date("2024-05-06 17:37"))
  })

  it("allows overflow", () => {
    expect(setHour("2024-07-28 16:17", 37)).toEqual(date("2024-07-29 13:17"))
  })

  it("allows underflow", () => {
    expect(setHour("2024-03-20 13:06", -6)).toEqual(date("2024-03-19 18:06"))
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-05-06 10:37:22.123"))

    expect(setHour(null, 6)).toEqual(date("2024-05-06 06:37:22.123"))
  })
})
