import { describe, it, expect } from "vitest";
import { iso8601 } from "../iso8601";

process.env.TZ = "America/New_York";

describe("validating ISO 8601", () => {
  it("validates full dates", () =>
    expect(iso8601("2022-01-22 00:00:00")).toBe(true));
  it("validates full dates with T", () =>
    expect(iso8601("2022-01-22T23:59:59")).toBe(true));
  it("allows ancient dates", () =>
    expect(iso8601("0032-06-15 00:00:00")).toBe(true));
  it("allows milliseconds", () =>
    expect(iso8601("0032-06-15 00:00:00.456")).toBe(true));
  it("does not allow 24 hours", () =>
    expect(iso8601("2022-01-22 24:00:00")).toBe(false));
  it("does not allow 60 minutes", () =>
    expect(iso8601("2022-01-22 00:60:00")).toBe(false));
  it("does not allow 60 seconds", () =>
    expect(iso8601("2022-01-22 00:00:60")).toBe(false));
  it("does not allow 13 months", () =>
    expect(iso8601("2022-13-22 00:00:00")).toBe(false));
  it("does not allow 10,000 years", () =>
    expect(iso8601("10000-01-01 00:00:00")).toBe(false));
  it("does not allow 40 days", () =>
    expect(iso8601("2000-01-40 00:00:00")).toBe(false));
  it("does not allow more than 3 milliseconds decimals", () =>
    expect(iso8601("2000-01-30 00:00:00.000000000")).toBe(false));
});
