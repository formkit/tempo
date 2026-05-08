import { describe, expect, it } from "vitest"
import { setSeconds } from "../setSeconds"
import { date } from "../date"

describe("setSeconds", () => {
  it("should set the minute", () => {
    expect(setSeconds("2024-05-06 10:00:00", 45)).toEqual(date("2024-05-06 10:00:45"))
  })

  it("should overflow when given more than 59 seconds", () => {
    expect(setSeconds("2024-07-28 16:10", 84)).toEqual(date("2024-07-28 16:11:24"))
  })

  it("should underflow when given a negative number", () => {
    expect(setSeconds("2024-03-20 13:00", -40)).toEqual(date("2024-03-20 12:59:20"))
  })

  it("should set seconds to 54 from current time", () => {
    const d = date()
    d.setSeconds(54)
    expect(setSeconds(null, 54)).toEqual(d)
  })
})
