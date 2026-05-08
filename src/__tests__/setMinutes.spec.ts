import { describe, expect, it } from "vitest"
import { setMinutes } from "../setMinutes"
import { date } from "../date"

describe("setMinutes", () => {
  it("should set the minute", () => {
    expect(setMinutes("2024-05-06 10:00", 45)).toEqual(date("2024-05-06 10:45"))
  })

  it("should overflow when given more than 59 minutes", () => {
    expect(setMinutes("2024-07-28 16:10", 84)).toEqual(date("2024-07-28 17:24"))
  })

  it("should underflow when given a negative number", () => {
    expect(setMinutes("2024-03-20 13:00", -40)).toEqual(date("2024-03-20 12:20"))
  })

  it("should set minutes to 30 from current time", () => {
    const d = date()
    d.setMinutes(30)
    expect(setMinutes(null, 30)).toEqual(d)
  })
})
