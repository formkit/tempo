import { describe, it, expect } from "vitest"
import { diffSeconds } from "../diffSeconds"

describe("differenceInSeconds", () => {
  it("difference is 28 seconds", () => {
    expect(
      diffSeconds("2024-04-07T09:10:28.900Z", "2024-04-07T09:10:00.000Z")
    ).toBe(28)
  })
})
