import { describe, expect, it } from "vitest"
import { setYear } from "../setYear"
import { date } from "../date"

describe("setYear", () => {
  it("should set year to 1998", () => {
    expect(setYear("2010-06-29", 1998)).toEqual(date("1998-06-29"))
  })

  it("should set year to 2017 with current time", () => {
    const d = date()
    d.setFullYear(2017)
    expect(setYear(null, 2017)).toEqual(d)
  })

  it("should handle overflow from leap year to not leap year", () => {
    expect(setYear("2024-02-29", 2023)).toEqual(date("2023-02-28"))
  })
})
