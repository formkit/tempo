import { describe, expect, it } from "vitest"
import { differenceInHours } from "../differenceInHours"

describe("differenceInHours", () => {
  it("difference is 5 hours", () => {
    expect(
      differenceInHours("2024-04-07T15:28:00.000Z", "2024-04-07T09:50:00.000Z")
    ).toBe(5)
  })
})
