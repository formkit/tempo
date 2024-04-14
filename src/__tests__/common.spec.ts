import { describe, expect, it } from "vitest"
import { getOffsetFormat } from "../common"

describe("getOffsetFormat", () => {
  it("should return 'Z' for format 'YYYY-MM-DDTHH:mm:ssZ'", () => {
    expect(getOffsetFormat("YYYY-MM-DDTHH:mm:ssZ")).toBe("Z")
  })

  it("should return 'ZZ' for format 'YYYY-MM-DDTHH:mm:ssZZ'", () => {
    expect(getOffsetFormat("YYYY-MM-DDTHH:mm:ssZZ")).toBe("ZZ")
  })

  it("should return 'Z' for formats 'full', 'long', 'medium', and 'short'", () => {
    expect(getOffsetFormat("full")).toBe("Z")
    expect(getOffsetFormat("long")).toBe("Z")
    expect(getOffsetFormat("medium")).toBe("Z")
    expect(getOffsetFormat("short")).toBe("Z")
  })

  it("should return 'Z' for formats { date: 'full', time: 'full' }, { date: 'full' }, and { time: 'full' }", () => {
    expect(getOffsetFormat({ date: "full", time: "full" })).toBe("Z")
    expect(getOffsetFormat({ date: "full" })).toBe("Z")
    expect(getOffsetFormat({ time: "full" })).toBe("Z")
  })
})
