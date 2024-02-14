import { describe, it, expect } from "vitest"
import { hourStart } from "../hourStart"
process.env.TZ = "America/New_York"

describe("hourStart", () => {
  it("can become the start of the hour", () => {
    expect(hourStart("2023-02-22T12:30:00Z").toISOString()).toBe(
      "2023-02-22T12:00:00.000Z"
    )
  })
})
