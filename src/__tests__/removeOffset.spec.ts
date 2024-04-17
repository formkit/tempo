import { describe, it, expect } from "vitest"
import { removeOffset } from "../removeOffset"
process.env.TZ = "America/New_York"

describe("removeOffset", () => {
  it("can apply a negative offset to a date", () => {
    expect(
      removeOffset("2023-02-21T19:00:00.000Z", "-05:00").toISOString()
    ).toBe("2023-02-22T00:00:00.000Z")
    expect(
      removeOffset("2023-02-21T19:00:00.000Z", "-0500").toISOString()
    ).toBe("2023-02-22T00:00:00.000Z")
  })

  it("can apply a positive offset to a date", () => {
    expect(
      removeOffset("2023-04-13T16:15:00.000Z", "+02:00").toISOString()
    ).toBe("2023-04-13T14:15:00.000Z")
    expect(
      removeOffset("2023-04-13T16:15:00.000Z", "+0200").toISOString()
    ).toBe("2023-04-13T14:15:00.000Z")
  })
})
