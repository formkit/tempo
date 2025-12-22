import { describe, it, expect } from "vitest"
import { addMillisecond } from "../addMillisecond"
process.env.TZ = "America/New_York"

describe("addMillisecond", () => {
  it("can increment by 1 millisecond", () => {
    expect(addMillisecond("2022-01-01T00:00:00.000Z").toISOString()).toBe(
      "2022-01-01T00:00:00.001Z"
    )
  })

  it("can increment by multiple milliseconds", () => {
    expect(addMillisecond("2022-01-01T00:00:00.000Z", 500).toISOString()).toBe(
      "2022-01-01T00:00:00.500Z"
    )
  })

  it("can increment milliseconds that roll over to next second", () => {
    expect(addMillisecond("2022-01-01T00:00:00.999Z", 1).toISOString()).toBe(
      "2022-01-01T00:00:01.000Z"
    )
  })

  it("can decrement milliseconds by providing negative count", () => {
    expect(addMillisecond("2022-01-01T00:00:01.000Z", -1).toISOString()).toBe(
      "2022-01-01T00:00:00.999Z"
    )
  })

  it("can handle large millisecond counts crossing multiple seconds", () => {
    expect(addMillisecond("2022-01-01T00:00:00.000Z", 2500).toISOString()).toBe(
      "2022-01-01T00:00:02.500Z"
    )
  })
})
