import { describe, it, expect } from "vitest"
import { format } from "../format"
import { parse } from "../parse"
import { date } from "../date"
import { tzDate } from "../tzDate"

describe("milliseconds support", () => {
  describe("format with SSS token", () => {
    it("formats milliseconds with SSS token", () => {
      const d = new Date("2024-01-15T10:30:45.789Z")
      expect(format({ date: d, format: "ss.SSS", tz: "UTC" })).toBe("45.789")
    })

    it("pads SSS to 3 digits for small values", () => {
      const d = new Date("2024-01-15T10:30:45.007Z")
      expect(format({ date: d, format: "SSS", tz: "UTC" })).toBe("007")
    })

    it("pads SSS to 3 digits for zero", () => {
      const d = new Date("2024-01-15T10:30:45.000Z")
      expect(format({ date: d, format: "SSS", tz: "UTC" })).toBe("000")
    })
  })

  describe("parse with SSS token (gracious variable-length)", () => {
    it("parses 1 digit", () => {
      const result = parse("45.1", "ss.SSS")
      expect(result.getMilliseconds()).toBe(100)
    })

    it("parses 2 digits", () => {
      const result = parse("45.12", "ss.SSS")
      expect(result.getMilliseconds()).toBe(120)
    })

    it("parses 3 digits", () => {
      const result = parse("45.123", "ss.SSS")
      expect(result.getMilliseconds()).toBe(123)
    })

    it("parses 6 digits (ISO high precision) - graciously truncates", () => {
      const result = parse("45.123456", "ss.SSS")
      expect(result.getMilliseconds()).toBe(123)
    })

    it("parses 9 digits (nanoseconds) - graciously truncates", () => {
      const result = parse("45.123456789", "ss.SSS")
      expect(result.getMilliseconds()).toBe(123)
    })

    it("parses .000000 correctly", () => {
      const result = parse("45.000000", "ss.SSS")
      expect(result.getMilliseconds()).toBe(0)
    })
  })

  describe("round-trip integrity", () => {
    it("preserves milliseconds in format/parse round-trip", () => {
      const original = new Date("2024-01-15T10:30:45.456Z")
      const formatted = format({ date: original, format: "YYYY-MM-DDTHH:mm:ss.SSSZ", tz: "UTC" })
      expect(formatted).toBe("2024-01-15T10:30:45.456+00:00")
      const parsed = parse(formatted, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      expect(parsed.getTime()).toBe(original.getTime())
    })

    it("handles high-precision input gracefully", () => {
      // Input has 6 digit precision, but we can only store 3
      const parsed = parse("2024-01-15T10:30:45.123456+00:00", "YYYY-MM-DDTHH:mm:ss.SSSZ")
      expect(parsed.getMilliseconds()).toBe(123)
      // Re-formatting outputs 3 digits
      const formatted = format({ date: parsed, format: "YYYY-MM-DDTHH:mm:ss.SSSZ", tz: "UTC" })
      expect(formatted).toBe("2024-01-15T10:30:45.123+00:00")
    })
  })

  describe("date() preserves milliseconds", () => {
    it("preserves milliseconds from Date object", () => {
      const input = new Date("2024-01-15T10:30:45.789Z")
      const result = date(input)
      expect(result.getMilliseconds()).toBe(789)
    })

    it("preserves milliseconds from ISO string", () => {
      const result = date("2024-01-15T10:30:45.789Z")
      expect(result.getMilliseconds()).toBe(789)
    })

    it("preserves milliseconds from high-precision ISO string", () => {
      const result = date("2024-01-15T10:30:45.789012Z")
      expect(result.getMilliseconds()).toBe(789) // JS Date truncates
    })
  })

  describe("tzDate() preserves milliseconds", () => {
    it("preserves milliseconds when creating timezone date", () => {
      const result = tzDate("2024-01-15T10:30:45.789", "America/New_York")
      expect(result.getMilliseconds()).toBe(789)
    })
  })
})
