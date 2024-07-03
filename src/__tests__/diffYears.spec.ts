import { describe, it, expect, suite } from "vitest"
import { diffYears } from "../diffYears"
import { addYear } from "../addYear"

describe("differenceInYears", () => {
  it("returns the amount of full years between dates", () => {
    expect(diffYears("2025-04-20", "2024-03-31")).toBe(1)
  })

  it("returns a negative number when swapped around as the first is now smaller", () => {
    expect(diffYears("2024-03-31", "2025-04-20")).toBe(-1)
  })

  // date-fns had a lot of tests for the leap day
  // although because differenceInMonth/year doesn't depend on time it shouldn't be an issue
  suite("leap days", () => {
    it("supports right side dates that are after a leap day", () => {
      expect(diffYears("2024-02-29", "2022-03-01")).toBe(1)
    })

    it("And also supports if right side date is before the leap date", () => {
      expect(diffYears("2024-02-29", "2022-02-28")).toBe(2)
    })

    it("supports future dates", () => {
      expect(diffYears("2024-02-29", "2026-03-10")).toBe(-2)
    })

    it("equal (leap) day give 0", () => {
      expect(diffYears("2024-02-28", "2024-02-28")).toBe(0)
    })

    it("Futute (leap) dates supported", () => {
      expect(diffYears("2028-02-29", "2024-02-29")).toBe(4)
    })
  })

  // some of the edge cases are also tested with leap days
  suite("edge cases", () => {
    it("difference is less than a year because of 1 day difference", () => {
      // NL kings day
      expect(diffYears("2025-04-26", "2024-04-27")).toBe(0)
    })

    it("same but swapped", () => {
      expect(diffYears("2024-04-27", "2025-04-26")).toBe(0)
    })
  })

  it("different should be 3 month compared to current time", () => {
    const compare = addYear(null, -6)
    expect(diffYears(null, compare)).toBe(6)
  })
})
