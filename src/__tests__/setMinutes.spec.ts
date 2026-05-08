import { afterEach, describe, expect, it, vi } from "vitest"
import { setMinutes } from "../setMinutes"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("setMinutes", () => {
  it("sets minutes", () => {
    expect(setMinutes("2024-05-06 10:00", 45)).toEqual(date("2024-05-06 10:45"))
  })

  it("allows overflow", () => {
    expect(setMinutes("2024-07-28 16:10", 84)).toEqual(date("2024-07-28 17:24"))
  })

  it("allows underflow", () => {
    expect(setMinutes("2024-03-20 13:00", -40)).toEqual(date("2024-03-20 12:20"))
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-05-06 10:17:22.123"))

    expect(setMinutes(null, 30)).toEqual(date("2024-05-06 10:30:22.123"))
  })
})
