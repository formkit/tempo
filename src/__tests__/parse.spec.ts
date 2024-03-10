import { describe, it, expect } from "vitest"
import { parse } from "../parse"
import { format } from "../format"
process.env.TZ = "America/New_York"
/**
 * YY - 2 digit year
 * YYYY - 4 digit year
 * M - The month 1-12
 * MM - The month 01-12
 * MMM - Short name Jan-Dec
 * MMMM - Full name January - December
 * D - The day of the month 1-31
 * DD - The day of the month 01-31
 * d - Single digit day "T"
 * ddd - Short day name Thu
 * dddd - Full day name Wednesday
 * H - Minimum hour digits, 24 hour, 0-23
 * HH - 2 hour digits, 24 hour, 00-23
 * h - Minimum hour digits, 12 hour clock, 1-12
 * hh - 2 hour digits, 12 hour clock, 01-12
 * m - The minute 0-12
 * mm - The minute 00-12
 * s - The second 0-59
 * ss - The second 00-59
 * a - am/pm
 * A - AM/PM
 * Z - Timezone
 */
describe("parse", () => {
  it("can parse a simple MM/DD/YYYY format", () => {
    expect(parse("10/05/2022", "MM/DD/YYYY", "en").toISOString()).toBe(
      "2022-10-05T04:00:00.000Z"
    )
  })
  it("can parse a format with some escapes and characters", () => {
    expect(
      parse(
        "Checkin: Dec 17, 2040",
        "C\\heckin: MMM D, YYYY",
        "en"
      ).toISOString()
    ).toBe("2040-12-17T05:00:00.000Z")
  })
  it("throws when two variable length string tokens are next to each other", () => {
    expect(() => parse("MonJan15,2000", "dddMMM,DD,YYYY")).toThrow()
  })
  it("throws when two variable length numbers are next to each other", () => {
    expect(() => parse("11122", "MDYY")).toThrow()
  })
  it("throws when the delimiters are numbers", () => {
    expect(() => parse("1101122", "M0D1YY")).toThrow()
  })
  it("can parse MM/DD/YYYY", () => {
    expect(parse("12/17/1903", "MM/DD/YYYY").toISOString()).toBe(
      "1903-12-17T05:00:00.000Z"
    )
  })
  it("can parse space delimiters", () => {
    expect(parse("5 1 77", "M D YY").toISOString()).toBe(
      "1977-05-01T04:00:00.000Z"
    )
  })
  it("can parse the time of day", () => {
    const tz = new Date().getTimezoneOffset() / 60
    expect(parse("5:22pm", "h:mma").toISOString()).toBe(
      `${format(new Date(), "YYYY-MM-DDT")}${tz + 17}:22:00.000Z`
    )
    const am = tz + 5
    expect(parse("5:22am", "h:mma").toISOString()).toBe(
      `${format(new Date(), "YYYY-MM-DDT")}${
        am < 10 ? "0" + am : am
      }:22:00.000Z`
    )
  })
  it("can parse the time of day", () => {
    const tz = new Date().getTimezoneOffset() / 60
    expect(parse("5:22下午", "h:mma", "zh").toISOString()).toBe(
      `${format(new Date(), "YYYY-MM-DDT")}${tz + 17}:22:00.000Z`
    )
    const am = tz + 5
    expect(parse("5:22上午", "h:mma", "zh").toISOString()).toBe(
      `${format(new Date(), "YYYY-MM-DDT")}${
        am < 10 ? "0" + am : am
      }:22:00.000Z`
    )
  })
  it("can parse [+-]HH:mm", () => {
    expect(
      parse("1994-06-22T04:22:32+09:00", "YYYY-MM-DDTHH:mm:ssZ").toISOString()
    ).toBe("1994-06-21T19:22:32.000Z")
    expect(
      parse("1994-06-22T04:22:32+09:00").toISOString()
    ).toBe("1994-06-21T19:22:32.000Z")
  })
  it("can parse the string month in en", () => {
    let h: number | string = new Date("2019-01-01").getTimezoneOffset() / 60
    h = h < 10 ? `0${h}` : h
    expect(parse("January 31, 2019", "MMMM D, YYYY").toISOString()).toBe(
      `2019-01-31T${h}:00:00.000Z`
    )
  })
  it("can parse the string month in chinese", () => {
    let h: number | string = new Date("2019-01-01").getTimezoneOffset() / 60
    h = h < 10 ? `0${h}` : h
    expect(parse("一月 13, 2020", "MMMM D, YYYY", "zh").toISOString()).toBe(
      `2020-01-13T${h}:00:00.000Z`
    )
  })
  it("can parse 4pm August 15, 99", () => {
    expect(
      parse("4pm on August 15, 99", "ha on MMMM D, YY").toISOString()
    ).toBe("1999-08-15T20:00:00.000Z")
  })
  it("can parse midnight on december 31", () => {
    expect(
      parse("December 31 1999, 12am", "MMMM D YYYY, ha").toISOString()
    ).toBe("1999-12-31T05:00:00.000Z")
  })
  it("can parse the 17:31 on the current day", () => {
    const d = new Date()
    const h: number = new Date().getTimezoneOffset() / 60
    expect(parse("17:35:45", "H:mm:ss").toISOString()).toBe(
      `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, "0")}-${
        d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
      }T${17 + h}:35:45.000Z`
    )
  })

  it("can parse a long date format", () => {
    expect(parse("December 31, 1999", { date: "long" }).toISOString()).toBe(
      "1999-12-31T05:00:00.000Z"
    )
  })

  it("throws an error when the format does not include the time", () => {
    expect(() =>
      parse("December 31, 1999", { date: "long", time: "short" })
    ).toThrowError(
      `Date (December 31, 1999) does not match format (MMMM D, YYYY at h:mm A)`
    )
  })

  it("throws an error when an incomplete iso time does not match a locale time", () => {
    expect(() =>
      parse("2021-12-31", { date: "long", time: "short" })
    ).toThrowError(
      `Date (2021-12-31) does not match format (MMMM D, YYYY at h:mm A)`
    )
  })

  it("can parse am and pm accurately", () => {
    expect(
      parse("Thursday, March 12, 1999 at 5:55 PM", {
        date: "full",
        time: "short",
      }).toISOString()
    ).toBe("1999-03-12T22:55:00.000Z")
    expect(
      parse("Thursday, March 12, 1999 at 5:55 AM", {
        date: "full",
        time: "short",
      }).toISOString()
    ).toBe("1999-03-12T10:55:00.000Z")
  })
  it("can parse am and pm accurately on a 12 hour clock at 12pm", () => {
    expect(
      parse("Saturday, October 1, 2022 at 12:00 PM", {
        date: "full",
        time: "short",
      }).toISOString()
    ).toBe("2022-10-01T16:00:00.000Z")
  })
  it("can parse a cyrillic date", () => {
    expect(
      parse("14 мар. 2023 г.", { date: "medium" }, "ru").toISOString()
    ).toBe("2023-03-14T04:00:00.000Z")
  })
  it("throws when parsing an empty string", () => {
    expect(() => parse("", { date: "long" })).toThrow()
    expect(() => parse("", "ISO8601")).toThrow()
  })
  it("throws when parsing an date with a placeholder month", () => {
    expect(() => parse("MMMM 17, 1987", { date: "long" }, "en")).toThrow()
  })
  it("can parse a full date with a timezone offset", () => {
    expect(
      parse("Friday, May 5, 2023 at 1:30:10 AM -0600", {
        date: "full",
        time: "full",
      }).toISOString()
    ).toBe("2023-05-05T07:30:10.000Z")
  })
  it("can parse a custom format with a timezone offset", () => {
    expect(
      parse("2023-02-24T13:44-0500", "YYYY-MM-DDTHH:mmZ", "en").toISOString()
    ).toBe("2023-02-24T18:44:00.000Z")
    expect(
      parse("2023--0500-02-24T13:44", "YYYY-Z-MM-DDTHH:mm", "en").toISOString()
    ).toBe("2023-02-24T18:44:00.000Z")
  })
  it("can filter out the timezone offset", () => {
    expect(
      parse({
        date: "Friday, May 7, 2023 at 1:30:10 AM -1000",
        format: {
          date: "full",
          time: "full",
        },
        locale: "en",
        partFilter: (part) => part.partName !== "timeZoneName",
      }).toISOString()
    ).toBe("2023-05-07T05:30:10.000Z")
  })
  it("can filter out the timezone offset", () => {
    expect(
      parse({
        date: ", May 7, 2023 at 1:30:10 AM -1000",
        format: {
          date: "full",
          time: "full",
        },
        locale: "en",
        partFilter: (part) => part.partName !== "weekday",
      }).toISOString()
    ).toBe("2023-05-07T11:30:10.000Z")
  })

  it("can parse an out of range date and get the last date in that month", () => {
    expect(parse("2023-02-31", "YYYY-MM-DD").toISOString()).toBe(
      "2023-02-28T05:00:00.000Z"
    )
  })
  it("can parse an out of range date and get the date in the next month", () => {
    expect(
      parse({
        date: "2023-02-31",
        format: "YYYY-MM-DD",
        locale: "en",
        dateOverflow: "forward",
      }).toISOString()
    ).toBe("2023-03-03T05:00:00.000Z")
  })
  it("can throw an error for dates out of range in a month", () => {
    expect(() =>
      parse({
        date: "2023-02-31",
        format: "YYYY-MM-DD",
        locale: "en",
        dateOverflow: "throw",
      }).toISOString()
    ).toThrow()
  })
})
