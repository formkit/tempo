import { describe, it, expect } from "vitest"
import { diffMilliseconds } from "../diffMilliseconds"

describe("differenceInMilliseconds", () => {
  it("difference is 257 milliseconds", () => {
    expect(
      diffMilliseconds("2024-04-07T09:10:48.257Z", "2024-04-07T09:10:48.000Z")
    ).toBe(257)
  })
})
