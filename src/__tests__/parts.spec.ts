import { describe, it, expect } from "vitest"
import { parts } from "../parts"
process.env.TZ = "America/New_York"

describe("parts", () => {
  it("can determine a cyrillic long vs short month", () => {
    expect(parts("long", "ru").find((p) => p.partName === "month")?.token).toBe(
      "MMMM"
    )
  })
})
