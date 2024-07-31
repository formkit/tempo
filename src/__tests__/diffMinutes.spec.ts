import { describe, it, expect } from "vitest"
import { diffMinutes } from "../diffMinutes"
import { addMinute } from "../addMinute"

describe("differenceInMinutes", () => {
  it("difference is 18 minutes", () => {
    expect(diffMinutes("2024-04-07T09:28:30.050Z", "2024-04-07T09:10:00.000Z")).toBe(18)
  })
  it("difference is 19 minutes by using ceil", () => {
    expect(
      diffMinutes("2024-04-07T09:28:01.050Z", "2024-04-07T09:10:00.000Z", "ceil")
    ).toBe(19)
  })

  it("different should be 23 minutes compared to the current time", () => {
    const compare = addMinute(null, 23)
    expect(diffMinutes(compare)).toBe(23)
  })
})
