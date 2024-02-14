import { describe, it, expect } from "vitest"
import { minuteStart } from "../minuteStart"
process.env.TZ = "America/New_York"

describe("minuteStart", () => {
  it("can become the start of the minute", () => {
    expect(minuteStart("2023-02-22T12:30:30Z").toISOString()).toBe(
      "2023-02-22T17:30:00.000Z"
    )
  })
})
