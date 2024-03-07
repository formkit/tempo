import { describe, it, expect } from "vitest"
import { tzDate } from "../tzDate"
process.env.TZ = "America/New_York"

describe("tzDate", () => {
  it("can can parse an unzoned/offset iso8601 as if it was in a timezone", () => {
    expect(tzDate("2017-05-06T12:00", "Europe/Amsterdam").toISOString()).toBe(
      "2017-05-06T18:00:00.000Z"
    )
  })
})
