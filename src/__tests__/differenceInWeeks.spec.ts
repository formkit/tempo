import { describe, expect, it } from "vitest"
import { differenceInWeeks } from "../differenceInWeeks"

describe("differenceInSeconds", () => {
  it("difference is 5 hours", () => {
    expect(differenceInWeeks("2024-04-15", "2024-04-07")).toBe(1)
  })
})
