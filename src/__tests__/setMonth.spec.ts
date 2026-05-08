import { afterEach, describe, expect, it, vi } from "vitest"
import { setMonth } from "../setMonth"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("setMonth", () => {
  it("sets the zero-based month", () => {
    expect(setMonth("2019-10-10", 1)).toEqual(date("2019-02-10"))
  })

  it("prevents day overflow in leap years", () => {
    expect(setMonth("2024-03-31", 1)).toEqual(date("2024-02-29"))
  })

  it("prevents day overflow in non-leap years", () => {
    expect(setMonth("2023-03-31", 1)).toEqual(date("2023-02-28"))
  })

  it("allows day overflow when requested", () => {
    expect(setMonth("2023-03-31", 3, true)).toEqual(date("2023-05-01"))
  })

  it("allows month overflow", () => {
    expect(setMonth("2020-01-05", 13)).toEqual(date("2021-02-05"))
  })

  it("allows month underflow", () => {
    expect(setMonth("2020-01-05", -3)).toEqual(date("2019-10-05"))
  })

  it("uses the current time when input is null", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-05-06 10:15:30.400"))

    expect(setMonth(null, 7)).toEqual(date("2024-08-06 10:15:30.400"))
  })
})
