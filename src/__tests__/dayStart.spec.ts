import { describe, it, expect } from "vitest"
import { dayStart } from "../dayStart"
process.env.TZ = "America/New_York"

describe("dayStart", () => {
  it("can become the start of the day", () => {
    expect(dayStart("2023-02-22T12:00:00Z").toISOString()).toBe(
      "2023-02-22T05:00:00.000Z"
    )
  })
})
