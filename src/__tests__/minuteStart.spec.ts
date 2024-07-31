import { describe, it, expect } from "vitest"
import { minuteStart } from "../minuteStart"
process.env.TZ = "America/New_York"

describe("minuteStart", () => {
  it("can become the start of the minute", () => {
    expect(minuteStart("2023-02-22T12:30:30Z").toISOString()).toBe(
      "2023-02-22T12:30:00.000Z"
    )
  })

  it("can become the start of the current minute", () => {
    const compare = new Date()
    compare.setSeconds(0, 0)
    expect(minuteStart()).toEqual(compare)
  })
})
