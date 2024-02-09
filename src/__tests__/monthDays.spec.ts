import { describe, it, expect } from "vitest"
import { monthDays } from "../monthDays"
process.env.TZ = "America/New_York"

describe("monthDays", () => {
  it("gets the correct number of december days", () => {
    expect(monthDays("2020-12-01")).toBe(31)
  })
  it("gets the correct number of april days", () => {
    expect(monthDays("2020-04-01")).toBe(30)
  })
  it("gets the correct number of Feb days on non leap years", () => {
    expect(monthDays("2022-02-01")).toBe(28)
  })
  it("gets the correct number of Feb days on leap years", () => {
    expect(monthDays("2020-02-01")).toBe(29)
  })
})
