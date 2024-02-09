import { describe, it, expect } from "vitest"
import { weekStart } from "../weekStart"
process.env.TZ = "America/New_York"

describe("weekStart", () => {
  it("gets the correct first day of the week when the first day is in the middle of the week", () => {
    expect(weekStart("2022-12-01").toISOString()).toBe(
      "2022-11-27T05:00:00.000Z"
    )
    expect(weekStart("2022-03-16").toISOString()).toBe(
      "2022-03-13T05:00:00.000Z"
    )
  })
  it("gets the first day of the week, when it is the first day of the week", () => {
    expect(weekStart("2022-05-01 00:00:00").toISOString()).toBe(
      "2022-05-01T04:00:00.000Z"
    )
  })

  it("gets the first day of the week when shifted to monday", () => {
    expect(weekStart("2022-11-05 10:00:00", 1).toISOString()).toBe(
      "2022-10-31T04:00:00.000Z"
    )
  })

  it("gets the first day of the week, when the day is shifted to wednesday and it is tuesday", () => {
    expect(weekStart("2022-11-01", 3).toISOString()).toBe(
      "2022-10-26T04:00:00.000Z"
    )
  })
  it("gets the first day of the week, when the day is shifted to wednesday and it is thursday", () => {
    expect(weekStart("2022-11-03", 3).toISOString()).toBe(
      "2022-11-02T04:00:00.000Z"
    )
  })
})
