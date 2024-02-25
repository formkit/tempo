import { describe, it, expect } from "vitest"
import { addDay } from "../addDay"

describe("addDay", () => {
  it("gets the next day at the beginning of the month", () => {
    expect(addDay("2022-01-01").toISOString()).toBe("2022-01-02T05:00:00.000Z")
  })
  it("gets the next day at the end of the year", () => {
    expect(addDay("2022-12-31").toISOString()).toBe("2023-01-01T05:00:00.000Z")
  })
  it("gets the next day by providing specified positive number of days", () => {
    expect(addDay("2022-01-01", 5).toISOString()).toBe("2022-01-06T05:00:00.000Z")
  })
  it("gets the next day by providing specified negative number of days", () => {
    expect(addDay("2022-01-01", -5).toISOString()).toBe("2021-12-27T05:00:00.000Z")
  })
})
