import { describe, it, expect } from "vitest"
import { tzDate } from "../tzDate"
process.env.TZ = "America/New_York"

describe("tzDate", () => {
  it("can can parse an unzoned/offset iso8601 as if it was in a timezone", () => {
    expect(tzDate("2017-05-06T12:00", "Europe/Amsterdam").toISOString()).toBe(
      "2017-05-06T10:00:00.000Z"
    )
  })
  it("uses the offset of the given time, not of the same time on the device", () => {
    // 01:30 in Amsterdam is still summer time (+02:00), but 01:30 in New York
    // is already after Amsterdam's change back to +01:00.
    expect(tzDate("2024-10-27T01:30", "Europe/Amsterdam").toISOString()).toBe(
      "2024-10-26T23:30:00.000Z"
    )
    // Cairo moves to summer time at midnight on 2024-04-26.
    expect(tzDate("2024-04-25T21:00", "Africa/Cairo").toISOString()).toBe(
      "2024-04-25T19:00:00.000Z"
    )
    expect(tzDate("2024-04-26T02:00", "Africa/Cairo").toISOString()).toBe(
      "2024-04-25T23:00:00.000Z"
    )
  })
  it("gives the earlier time for a wall time that happens twice", () => {
    expect(tzDate("2024-10-27T02:30", "Europe/Amsterdam").toISOString()).toBe(
      "2024-10-27T00:30:00.000Z"
    )
  })
  it("moves a skipped wall time forward by the gap", () => {
    // 02:30 does not exist in Amsterdam on 2024-03-31, it is 03:30 +02:00.
    expect(tzDate("2024-03-31T02:30", "Europe/Amsterdam").toISOString()).toBe(
      "2024-03-31T01:30:00.000Z"
    )
  })
  it("keeps a wall time that does not exist on the device", () => {
    // 02:30 is skipped in New York on 2024-03-10, but it exists in Tokyo.
    expect(tzDate("2024-03-10T02:30", "Asia/Tokyo").toISOString()).toBe(
      "2024-03-09T17:30:00.000Z"
    )
  })
  it("reads a string with Z or an offset as an instant", () => {
    // 01:30Z is 21:30 on the device (New York), so it becomes 21:30 in Amsterdam.
    for (const input of [
      "2024-10-27T01:30Z",
      "2024-10-27T03:30+02:00",
      "2024-10-27T01:30:00.000Z",
    ]) {
      expect(tzDate(input, "Europe/Amsterdam").toISOString()).toBe(
        "2024-10-26T19:30:00.000Z"
      )
    }
    expect(
      tzDate("2024-07-01T12:00:00.123-04:00", "Asia/Tokyo").toISOString()
    ).toBe("2024-07-01T03:00:00.123Z")
  })
  it("keeps a zoneless wall time with fractional seconds", () => {
    expect(tzDate("2024-03-10T02:30:00.500", "Asia/Tokyo").toISOString()).toBe(
      "2024-03-09T17:30:00.500Z"
    )
  })
  it("uses the local time of a Date object", () => {
    expect(
      tzDate(new Date(2024, 9, 27, 1, 30), "Europe/Amsterdam").toISOString()
    ).toBe("2024-10-26T23:30:00.000Z")
  })
})
