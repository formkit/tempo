import { describe, expect, it } from "vitest";
import { formatOrParseDuration } from "../duration";

describe("formatOrParseDuration", () => {
  describe("formatDuration", () => {
    it("formats duration to hh:mm:ss", () => {
      expect(formatOrParseDuration(3661000)).toBe("01:01:01");
    });

    it("formats duration to mm:ss", () => {
      expect(formatOrParseDuration(61000, { format: "mm:ss" })).toBe("01:01");
    });

    it("formats duration to hh:mm", () => {
      expect(formatOrParseDuration(3660000, { format: "hh:mm" })).toBe("01:01");
    });

    it("formats duration to DD:hh:mm:ss", () => {
      expect(formatOrParseDuration(90061000, { format: "DD:hh:mm:ss" })).toBe("01:01:01:01");
    });

    it("formats duration to DD:hh:mm:ss:SSS", () => {
      expect(formatOrParseDuration(90061001, { format: "DD:hh:mm:ss:SSS" })).toBe("01:01:01:01:001");
    });

    it("formats duration to hh:mm:ss,SSS", () => {
      expect(formatOrParseDuration(3661001, { format: "hh:mm:ss,SSS" })).toBe("01:01:01,001");
    });

    it("throws error for invalid input", () => {
      expect(() => formatOrParseDuration("invalid input")).toThrow("Invalid input or options.");
    });
  });

  describe("parseDuration", () => {
    it("parses hh:mm:ss to milliseconds", () => {
      expect(formatOrParseDuration("01:01:01", { format: "hh:mm:ss", parse: true })).toBe(3661000);
    });

    it("parses mm:ss to milliseconds", () => {
      expect(formatOrParseDuration("01:01", { format: "mm:ss", parse: true })).toBe(61000);
    });

    it("parses hh:mm to milliseconds", () => {
      expect(formatOrParseDuration("01:01", { format: "hh:mm", parse: true })).toBe(3660000);
    });

    it("parses DD:hh:mm:ss to milliseconds", () => {
      expect(formatOrParseDuration("01:01:01:01", { format: "DD:hh:mm:ss", parse: true })).toBe(90061000);
    });

    it("parses DD:hh:mm:ss:SSS to milliseconds", () => {
      expect(formatOrParseDuration("01:01:01:01:001", { format: "DD:hh:mm:ss:SSS", parse: true })).toBe(90061001);
    });

    it("parses hh:mm:ss,SSS to milliseconds", () => {
      expect(formatOrParseDuration("01:01:01,001", { format: "hh:mm:ss,SSS", parse: true })).toBe(3661001);
    });

    it("throws error for invalid duration string", () => {
      expect(() => formatOrParseDuration("invalid input", { format: "hh:mm:ss", parse: true })).toThrow("Invalid duration string.");
    });
  });
});
