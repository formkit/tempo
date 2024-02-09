import { describe, it, expect } from "vitest"
import { offset } from "../offset"
process.env.TZ = "America/New_York"

describe("offset", () => {
  it("can determine the offset of a winter month to UTC", () => {
    expect(offset("2023-02-22")).toBe("-0500")
  })
  it("changes the offset after daylight savings", () => {
    expect(offset("2023-03-12T06:59:00Z")).toBe("-0500")
    expect(offset("2023-03-12T07:00:00Z")).toBe("-0400")
  })
  it("can determine the offset to another base timezone", () => {
    expect(offset("2023-02-22", "Europe/Amsterdam")).toBe("-0600")
  })
  it("can determine the offset to another base timezone with daylight savings", () => {
    expect(offset("2023-03-26T00:59Z", "Europe/Amsterdam")).toBe("-0500")
    expect(offset("2023-03-26T01:00Z", "Europe/Amsterdam")).toBe("-0600")
  })
  it("can determine the offset between two arbitrary timezones", () => {
    expect(offset("2023-02-22", "Europe/Moscow", "America/Los_Angeles")).toBe(
      "-1100"
    )
    expect(offset("2023-02-22", "America/Los_Angeles", "Europe/Moscow")).toBe(
      "+1100"
    )
  })
  it("can determine the offset to a non full-hour offset timezone", () => {
    expect(offset("2023-02-22", "Europe/London", "Pacific/Chatham")).toBe(
      "+1345"
    )
  })
})
