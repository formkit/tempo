import { describe, it, expect } from "vitest"
import { minuteEnd } from "../minuteEnd"
process.env.TZ = "America/New_York"

describe("minuteEnd", () => {
  it("can become the end of the hour", () => {
    expect(minuteEnd("2023-02-22T12:30:30Z").toISOString()).toBe(
      "2023-02-22T17:30:59.999Z"
    )
  })
})
