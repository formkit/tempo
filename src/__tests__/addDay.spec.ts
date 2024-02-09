import { describe, it, expect } from "vitest"
import { addDay } from "../addDay"
process.env.TZ = "America/New_York"

describe("addDay", () => {
  it("gets the next day at the beginning of the month", () => {
    expect(addDay("2022-01-01").toISOString()).toBe("2022-01-02T05:00:00.000Z")
  })
  it("gets the next day at the end of the year", () => {
    expect(addDay("2022-12-31").toISOString()).toBe("2023-01-01T05:00:00.000Z")
  })
})
