import { describe, it, expect } from "vitest"
import { hourStart } from "../hourStart"
process.env.TZ = "America/New_York"

describe("hourStart", () => {
  it("can become the start of the hour", () => {
    expect(hourStart("2023-02-22T12:30:00Z").toISOString()).toBe(
      "2023-02-22T12:00:00.000Z"
    )
  })

  it("can become the start of the current hour", () => {
    const compare = new Date()
    compare.setMinutes(0, 0, 0)
    expect(hourStart()).toEqual(compare)
  })
})
