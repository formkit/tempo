import { afterEach, describe, expect, it, vi } from "vitest"
import { setSeconds } from "../setSeconds"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("setSeconds", () => {
  it("sets seconds", () => {
    expect(setSeconds("2024-05-06 10:00:00", 45)).toEqual(date("2024-05-06 10:00:45"))
  })

  it("allows overflow", () => {
    expect(setSeconds("2024-07-28 16:10", 84)).toEqual(date("2024-07-28 16:11:24"))
  })

  it("allows underflow", () => {
    expect(setSeconds("2024-03-20 13:00", -40)).toEqual(date("2024-03-20 12:59:20"))
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-05-06 10:00:17.123"))

    expect(setSeconds(null, 54)).toEqual(date("2024-05-06 10:00:54.123"))
  })
})
