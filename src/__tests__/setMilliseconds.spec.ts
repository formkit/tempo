import { describe, expect, it } from "vitest"
import { setMilliseconds } from "../setMilliseconds"
import { date } from "../date"

describe("setSeconds", () => {
  it("should set the minute", () => {
    expect(setMilliseconds("2024-05-06 10:00:00", 445)).toEqual(
      date("2024-05-06 10:00:00.445")
    )
  })

  it("should overflow when given more than 59 seconds", () => {
    expect(setMilliseconds("2024-07-28 16:10", 1584)).toEqual(
      date("2024-07-28 16:10:01.584")
    )
  })

  it("should underflow when given a negative number", () => {
    expect(setMilliseconds("2024-03-20 13:00", -40)).toEqual(
      date("2024-03-20 12:59:59.960")
    )
  })

  it("should set ms to 54 from current time", () => {
    const d = date()
    d.setMilliseconds(54)
    expect(setMilliseconds(null, 54)).toEqual(d)
  })
})
