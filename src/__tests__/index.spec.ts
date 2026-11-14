import { describe, it, expect } from "vitest"
import * as tempo from "../index"

describe("index exports", () => {
  it("exports sameMonth", () => {
    expect(typeof tempo.sameMonth).toBe("function")
    expect(tempo.sameMonth("2023-02-02", "2024-02-01")).toBe(true)
  })
})
