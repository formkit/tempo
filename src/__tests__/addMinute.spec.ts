import { describe, it, expect } from "vitest"
import { addMinute } from "../addMinute"
process.env.TZ = "America/New_York"

describe("addMinute", () => {
  it("can increment a normal hour", () => {
    expect(addMinute("2022-01-01T00:00:00Z").toISOString()).toBe(
      "2022-01-01T00:01:00.000Z"
    )
  })
  it("can increment the last hours of the day into a new day", () => {
    expect(addMinute("2022-01-01T23:11:00Z", 181).toISOString()).toBe(
      "2022-01-02T02:12:00.000Z"
    )
  })
})
