import { describe, it, expect } from "vitest"
import { validOffset, fixedLengthByOffset, offsetToMins, secsToOffset, offsetToSecs } from "../common"
import { iso8601 } from "../iso8601"
import { applyOffset } from "../applyOffset"
import { parse } from "../parse"
import { format } from "../format"

/**
 * Tests for timezone offset seconds precision.
 *
 * Historical timezones had offsets with seconds (e.g., America/Detroit in 1904
 * had offset -05:32:11). This test suite ensures tempo can handle these offsets.
 *
 * Key requirement: Any date format we produce must be parseable back (round-trip).
 */

describe("timezone offset with seconds", () => {
  describe("validOffset with seconds", () => {
    it("should validate Z format with seconds (+HH:mm:ss)", () => {
      expect(validOffset("+05:32:11", "Z")).toBe("+05:32:11")
      expect(validOffset("-05:32:11", "Z")).toBe("-05:32:11")
      expect(validOffset("+00:00:30", "Z")).toBe("+00:00:30")
    })

    it("should validate ZZ format with seconds (+HHmmss)", () => {
      expect(validOffset("+053211", "ZZ")).toBe("+053211")
      expect(validOffset("-053211", "ZZ")).toBe("-053211")
      expect(validOffset("+000030", "ZZ")).toBe("+000030")
    })

    it("should still validate offsets without seconds", () => {
      expect(validOffset("+05:30", "Z")).toBe("+05:30")
      expect(validOffset("-05:00", "Z")).toBe("-05:00")
      expect(validOffset("+0530", "ZZ")).toBe("+0530")
    })
  })

  describe("fixedLengthByOffset with seconds", () => {
    it("should return 9 for Z format with seconds (+HH:mm:ss)", () => {
      expect(fixedLengthByOffset("+05:32:11")).toBe(9)
      expect(fixedLengthByOffset("-00:00:30")).toBe(9)
    })

    it("should return 8 for ZZ format with seconds (+HHmmss)", () => {
      expect(fixedLengthByOffset("+053211")).toBe(8)
      expect(fixedLengthByOffset("-000030")).toBe(8)
    })

    it("should still return 6 for Z format without seconds", () => {
      expect(fixedLengthByOffset("+05:30")).toBe(6)
    })

    it("should still return 5 for ZZ format without seconds", () => {
      expect(fixedLengthByOffset("+0530")).toBe(5)
    })
  })

  describe("secsToOffset", () => {
    it("should format offset without seconds when seconds are zero", () => {
      // 5 hours, 30 minutes = 19800 seconds
      expect(secsToOffset(19800, "Z")).toBe("+05:30")
      expect(secsToOffset(19800, "ZZ")).toBe("+0530")
      expect(secsToOffset(-18000, "Z")).toBe("-05:00")
    })

    it("should format offset with seconds when seconds are non-zero", () => {
      // 5 hours, 32 minutes, 11 seconds = 19931 seconds
      expect(secsToOffset(19931, "Z")).toBe("+05:32:11")
      expect(secsToOffset(19931, "ZZ")).toBe("+053211")
      expect(secsToOffset(-19931, "Z")).toBe("-05:32:11")
    })
  })

  describe("offsetToSecs", () => {
    it("should parse offset without seconds", () => {
      expect(offsetToSecs("+05:30", "Z")).toBe(19800)
      expect(offsetToSecs("-05:00", "Z")).toBe(-18000)
      expect(offsetToSecs("+0530", "ZZ")).toBe(19800)
    })

    it("should parse offset with seconds", () => {
      // 5 hours, 32 minutes, 11 seconds = 19931 seconds
      expect(offsetToSecs("+05:32:11", "Z")).toBe(19931)
      expect(offsetToSecs("-05:32:11", "Z")).toBe(-19931)
      expect(offsetToSecs("+053211", "ZZ")).toBe(19931)
    })
  })

  describe("offsetToMins with seconds", () => {
    it("should round to nearest minute when seconds present", () => {
      // +05:32:11 should round to 332 minutes (5*60+32, 11s rounds down)
      // +05:32:45 should round to 333 minutes (5*60+32+1, 45s rounds up)
      expect(() => offsetToMins("+05:32:11", "Z")).not.toThrow()
      expect(offsetToMins("+05:32:11", "Z")).toBe(332)  // rounds down (11s < 30s)
      expect(offsetToMins("+05:32:45", "Z")).toBe(333)  // rounds up (45s >= 30s)
    })
  })

  describe("ISO8601 regex with seconds in offset", () => {
    it("should match ISO8601 dates with seconds in timezone offset", () => {
      expect(iso8601("2023-05-05T07:30:10+05:32:11")).toBe(true)
      expect(iso8601("1904-01-01T00:00:00-05:32:11")).toBe(true)
      expect(iso8601("2023-05-05T07:30:10+053211")).toBe(true)
    })

    it("should still match ISO8601 dates without seconds in offset", () => {
      expect(iso8601("2023-05-05T07:30:10+05:30")).toBe(true)
      expect(iso8601("2023-05-05T07:30:10Z")).toBe(true)
    })
  })

  describe("applyOffset with seconds", () => {
    it("should apply offset with seconds precision", () => {
      const baseDate = new Date("2023-05-05T00:00:00Z")
      // Apply +05:32:11 offset (5 hours, 32 minutes, 11 seconds = 19931 seconds)
      const result = applyOffset(baseDate, "+05:32:11")
      // Result should be 19931 seconds ahead
      expect(result.getTime() - baseDate.getTime()).toBe(19931 * 1000)
    })

    it("should apply offset in ZZ format with seconds", () => {
      const baseDate = new Date("2023-05-05T00:00:00Z")
      const result = applyOffset(baseDate, "+053211")
      expect(result.getTime() - baseDate.getTime()).toBe(19931 * 1000)
    })
  })

  describe("parse with seconds in offset", () => {
    it("should parse dates with seconds in timezone offset (Z format)", () => {
      // This date at midnight in Detroit 1904 (offset -05:32:11) should be
      // parsed correctly accounting for the 11 seconds
      const result = parse("1904-01-01T00:00:00-05:32:11", "YYYY-MM-DDTHH:mm:ssZ")
      // UTC time should be 1904-01-01T05:32:11Z
      expect(result.toISOString()).toBe("1904-01-01T05:32:11.000Z")
    })

    it("should parse dates with seconds in timezone offset (ZZ format)", () => {
      const result = parse("1904-01-01T00:00:00-053211", "YYYY-MM-DDTHH:mm:ssZZ")
      expect(result.toISOString()).toBe("1904-01-01T05:32:11.000Z")
    })
  })

  describe("format with seconds in offset", () => {
    it("should format dates to UTC with correct offset (no seconds)", () => {
      // When formatting in UTC, offset should be +00:00 (no seconds needed)
      const date = new Date("2023-05-05T12:00:00Z")
      const result = format({ date, format: "YYYY-MM-DDTHH:mm:ssZ", tz: "UTC" })
      expect(result).toBe("2023-05-05T12:00:00+00:00")
    })

    it("should format dates with timezone that has non-zero seconds offset", () => {
      // Note: Modern timezones don't have seconds in offsets, so this tests
      // the infrastructure. The real test is the round-trip.
      const date = new Date("2023-05-05T12:00:00Z")
      const result = format({ date, format: "YYYY-MM-DDTHH:mm:ssZ", tz: "America/New_York" })
      // Should contain a valid timezone offset
      expect(result).toMatch(/^2023-05-05T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/)
    })
  })

  describe("format/parse round-trip with seconds in offset", () => {
    it("should preserve the date when parsing and formatting back (the key mantra)", () => {
      // This is THE critical test: any format we produce must parse back to the same date
      // Parse a date with seconds in the offset
      const originalDateStr = "1904-01-01T00:00:00-05:32:11"
      const parsed = parse(originalDateStr, "YYYY-MM-DDTHH:mm:ssZ")

      // The parsed date should represent UTC 1904-01-01T05:32:11
      expect(parsed.toISOString()).toBe("1904-01-01T05:32:11.000Z")

      // When we format this date back in UTC, we should get the UTC time
      const formattedUtc = format({ date: parsed, format: "YYYY-MM-DDTHH:mm:ssZ", tz: "UTC" })
      expect(formattedUtc).toBe("1904-01-01T05:32:11+00:00")

      // The round-trip should work: parse the UTC-formatted string
      const reParsed = parse(formattedUtc, "YYYY-MM-DDTHH:mm:ssZ")
      expect(reParsed.getTime()).toBe(parsed.getTime())
    })

    it("should handle the specific issue: midnight in Detroit 1904", () => {
      // The issue states: "if you parse a date at midnight in one of these
      // timezones and then format it back you will lose 11 seconds of time
      // and the date will actually be the day before at 11:49pm"
      //
      // With the fix, this should NOT happen - we should preserve the 11 seconds
      const midnightDetroit1904 = "1904-01-01T00:00:00-05:32:11"
      const parsed = parse(midnightDetroit1904, "YYYY-MM-DDTHH:mm:ssZ")

      // UTC equivalent should be exactly 5:32:11 on Jan 1
      expect(parsed.getUTCFullYear()).toBe(1904)
      expect(parsed.getUTCMonth()).toBe(0)  // January
      expect(parsed.getUTCDate()).toBe(1)
      expect(parsed.getUTCHours()).toBe(5)
      expect(parsed.getUTCMinutes()).toBe(32)
      expect(parsed.getUTCSeconds()).toBe(11)
    })
  })
})
