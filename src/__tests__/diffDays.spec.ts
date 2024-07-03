import { describe, expect, it } from "vitest"
import { diffDays } from "../diffDays"
import { addDay } from "../addDay"

describe("differenceInDays", () => {
  it("difference is 3 days", () => {
    expect(diffDays("2024-04-10", "2024-04-07")).toBe(3)
  })

  it("difference is 2 days", () => {
    expect(diffDays("2024-04-10T09:50:00.000Z", "2024-04-07T15:28:00.000Z")).toBe(2)
  })

  it("difference is 3 days by using round", () => {
    expect(
      diffDays("2024-04-10T09:50:00.000Z", "2024-04-07T15:28:00.000Z", "round")
    ).toBe(3)
  })

  it("different should be -64 hours compared to current time", () => {
    const compare = addDay(null, -28)
    expect(diffDays(compare)).toBe(-28)
  })
})
