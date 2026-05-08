import { afterEach, describe, it, expect, vi } from "vitest"
import { diffSeconds } from "../diffSeconds"
import { addSecond } from "../addSecond"
import { date } from "../date"

afterEach(() => {
  vi.useRealTimers()
})

describe("differenceInSeconds", () => {
  it("difference is 28 seconds", () => {
    expect(diffSeconds("2024-04-07T09:10:28.900Z", "2024-04-07T09:10:00.000Z")).toBe(28)
  })

  it("different should be 50 seconds compared to the current time", () => {
    vi.useFakeTimers()
    vi.setSystemTime(date("2024-04-07T09:10:00.000Z"))
    const compare = addSecond(null, 50)

    expect(diffSeconds(compare)).toBe(50)
  })
})
