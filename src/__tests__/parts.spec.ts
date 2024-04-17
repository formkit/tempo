import { describe, it, expect } from "vitest"
import { parts } from "../parts"
process.env.TZ = "America/New_York"

describe("parts", () => {
  it("can determine a cyrillic long vs short month", () => {
    expect(parts("long", "ru").find((p) => p.partName === "month")?.token).toBe(
      "MMMM"
    )
  })
  it("uses a Z format when the time style is full", () => {
    expect(
      parts({ time: "full" }, "en").find((p) => p.partName === "timeZoneName")
        ?.token
    ).toBe("Z")
  })
  it("uses a ZZ format when the time style is long", () => {
    expect(
      parts({ time: "long" }, "en").find((p) => p.partName === "timeZoneName")
        ?.token
    ).toBe("ZZ")
  })
})
