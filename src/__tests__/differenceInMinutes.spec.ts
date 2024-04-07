import { describe, it, expect } from "vitest"
import { differenceInMinutes } from "../differenceInMinutes"

describe("differenceInSeconds", () => {
  it("difference is 18 minutes", () => {
    expect(
      differenceInMinutes(
        "2024-04-07T09:28:30.050Z",
        "2024-04-07T09:10:00.000Z"
      )
    ).toBe(18)
  })
  it("difference is 19 minutes by using ceil", () => {
    expect(
      differenceInMinutes(
        "2024-04-07T09:28:01.050Z",
        "2024-04-07T09:10:00.000Z",
        "ceil"
      )
    ).toBe(19)
  })
})
