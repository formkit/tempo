import { describe, it, expect } from "vitest"
import { differenceInMilliseconds } from "../differenceInMilliseconds"

describe("differenceInMilliseconds", () => {
  it("difference is 257 milliseconds", () => {
    expect(
      differenceInMilliseconds(
        "2024-04-07T09:10:48.257Z",
        "2024-04-07T09:10:48.000Z"
      )
    ).toBe(257)
  })
})
