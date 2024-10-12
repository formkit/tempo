import { describe, expect, it } from "vitest"
import { setMonth } from "../setMonth"
import { date } from "../date"

describe("setMonth", () => {
  it("should set month to Feb", () => {
    expect(setMonth("2019-10-10", 1)).toEqual(date("2019-02-10"))
  })

  it("should prevent overflow in leap year", () => {
    expect(setMonth("2024-03-31", 1)).toEqual(date("2024-02-29"))
  })

  it("should prevent overflow in none leap year", () => {
    expect(setMonth("2023-03-31", 1)).toEqual(date("2023-02-28"))
  })

  it("should overflow when month has less days", () => {
    expect(setMonth("2023-03-31", 3, true)).toEqual(date("2023-05-01"))
  })

  it("should overflow in months when given more than 11", () => {
    expect(setMonth("2020-01-05", 13)).toEqual(date("2021-02-05"))
  })

  it("should undeflow in months when giving negative", () => {
    expect(setMonth("2020-01-05", -3)).toEqual(date("2019-10-05"))
  })

  it("should set month to July with current time", () => {
    const d = date()
    d.setMonth(7)
    expect(setMonth(null, 7)).toEqual(d)
  })
})
