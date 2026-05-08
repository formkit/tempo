import { afterEach, describe, expect, it, vi } from "vitest"
import { setMilliseconds } from "../setMilliseconds"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("setMilliseconds", () => {
  it("sets milliseconds", () => {
    expect(setMilliseconds("2024-05-06 10:00:00", 445)).toEqual(
      date("2024-05-06 10:00:00.445")
    )
  })

  it("allows overflow", () => {
    expect(setMilliseconds("2024-07-28 16:10", 1584)).toEqual(
      date("2024-07-28 16:10:01.584")
    )
  })

  it("allows underflow", () => {
    expect(setMilliseconds("2024-03-20 13:00", -40)).toEqual(
      date("2024-03-20 12:59:59.960")
    )
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-05-06 10:00:00.123"))

    expect(setMilliseconds(null, 54)).toEqual(date("2024-05-06 10:00:00.054"))
  })
})
