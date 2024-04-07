import { describe, expect, it } from "vitest"
import { differenceInDays } from "../differenceInDays"

describe("differenceInSeconds", () => {
  it("difference is 3 days", () => {
    expect(differenceInDays("2024-04-10", "2024-04-07")).toBe(3)
  })

  it("difference is 2 days", () => {
    expect(
      differenceInDays("2024-04-10T09:50:00.000Z", "2024-04-07T15:28:00.000Z")
    ).toBe(2)
  })

  it("difference is 3 days by using round", () => {
    expect(
      differenceInDays(
        "2024-04-10T09:50:00.000Z",
        "2024-04-07T15:28:00.000Z",
        "round"
      )
    ).toBe(3)
  })
})
