import { describe, it, expect } from "vitest"
import { addYear } from "../addYear"
process.env.TZ = "America/New_York"

describe("addYear", () => {
  it("can add a year to a Date object by default", () => {
    const d = new Date("2000-12-17T12:00:00")
    const h: number = d.getTimezoneOffset() / 60
    expect(addYear(d).toISOString()).toBe(`2001-12-17T${12 + h}:00:00.000Z`)
  })
  it("can subtract a year to a Date", () => {
    const d = new Date("2000-12-17T12:00:00")
    const h: number = d.getTimezoneOffset() / 60
    expect(addYear(d, -1).toISOString()).toBe(`1999-12-17T${12 + h}:00:00.000Z`)
  })
  it("can overflow the day of the month on leap year", () => {
    expect(addYear("2000-02-29").toISOString()).toBe("2001-02-28T05:00:00.000Z")
  })

  // test with the current time is at diffYears
})
