import { describe, expect, it } from "vitest"
import { setHour } from "../setHour"
import { date } from "../date"

describe("setHour", () => {
  it("should set the minute", () => {
    expect(setHour("2024-05-06 10:37", 17)).toEqual(date("2024-05-06 17:37"))
  })

  it("should overflow when given more than 12 hours", () => {
    expect(setHour("2024-07-28 16:17", 37)).toEqual(date("2024-07-29 13:17"))
  })

  it("should underflow when given a negative number", () => {
    expect(setHour("2024-03-20 13:06", -6)).toEqual(date("2024-03-19 18:06"))
  })

  it("should set hour to 6am from current time", () => {
    const d = date()
    d.setHours(6)
    expect(setHour(null, 6)).toEqual(d)
  })
})
