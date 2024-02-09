import { describe, it, expect } from "vitest"
import { format } from "../format"
import { tzDate } from "../tzDate"
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
 */
describe("format", () => {
  it('renders "short" dates', () => {
    expect(format("2017-05-06", "short")).toEqual("5/6/17")
  })
  it('renders "medium" dates', () => {
    expect(format("2017-07-06", "medium")).toEqual("Jul 6, 2017")
  })
  it('renders "long" dates', () => {
    expect(format("2017-07-06", "long")).toEqual("July 6, 2017")
  })
  it('renders "full" dates', () => {
    expect(format("2017-07-06", "full")).toEqual("Thursday, July 6, 2017")
  })

  it("can render a single full year", () => {
    expect(format(new Date("2020-01-05"), "YYYY")).toEqual("2020")
  })
  it("can render a single 2 digit year", () => {
    expect(format("1999-05-06", "YY")).toEqual("99")
  })
  it("can render a single digit month", () => {
    expect(format("1999-05-06", "M")).toEqual("5")
  })
  it("can render a double digit month", () => {
    expect(format("1999-05-06", "MM")).toEqual("05")
  })
  it("can render a short month name", () => {
    expect(format("1999-12-06", "MMM")).toEqual("Dec")
  })
  it("can render a long month name", () => {
    expect(format("1999-01-06", "MMMM")).toEqual("January")
  })
  it("can render a one digit date", () => {
    expect(format("1999-01-06", "D")).toEqual("6")
  })
  it("can render a 2 digit date", () => {
    expect(format("1999-01-06", "DD")).toEqual("06")
  })
  it("can render the day of the week as a single character", () => {
    expect(format("2022-10-12", "d")).toEqual("W")
  })
  it("can render the day of the week as 3 characters", () => {
    expect(format("2022-10-13", "ddd")).toEqual("Thu")
  })
  it("can render the full day of the week", () => {
    expect(format("2022-10-10", "dddd")).toEqual("Monday")
  })
  it("can render the single digit 24 hour", () => {
    expect(format("2022-10-10 05:15:00", "H")).toEqual("5")
  })
  it("can render the double digit 24 hour", () => {
    expect(format("2022-10-10 15:15:00", "HH")).toEqual("15")
  })
  it("can render the single digit 12 hour", () => {
    expect(format("2022-10-10 13:15:00", "h")).toEqual("1")
  })
  it("can render the 2 digit 12 hour", () => {
    expect(format("2022-10-10 05:15:00", "hh")).toEqual("05")
  })
  it("can render the single digit minutes", () => {
    expect(format("2022-10-10 05:05:00", "m")).toEqual("5")
  })
  it("can render the two digit minutes", () => {
    expect(format("2022-10-10 07:07:00", "mm")).toEqual("07")
  })
  it("can render the single digit seconds", () => {
    expect(format("2022-10-10 07:07:01", "s")).toEqual("1")
  })
  it("can render the double digit seconds", () => {
    expect(format("2022-10-10 07:07:10", "ss")).toEqual("10")
  })
  it("can render the double digit seconds", () => {
    expect(format("2022-10-10 07:07:05", "ss")).toEqual("05")
  })
  it("can render am", () => {
    expect(format("2022-10-10 07:07:05", "a")).toEqual("am")
  })
  it("can render pm", () => {
    expect(format("2022-10-10 17:07:05", "a")).toEqual("pm")
  })
  it("throws an error when two month format are used", () => {
    expect(() => format("2020-01-01", "MM MMMM")).toThrow()
  })
  it("can format a standard US style date", () => {
    expect(format("1986-03-17T06:44:15", "MM/DD/YYYY")).toBe("03/17/1986")
  })
  it("can render us time with am/pm", () => {
    expect(format("2020-03-15T05:30:10", "h:mm:ss a")).toBe("5:30:10 am")
  })
  it("can render us time with AM/PM", () => {
    expect(format("2020-03-15T05:30:10", "h:mm:ss A")).toBe("5:30:10 AM")
  })
  it("can render us time with am/pm in chinese", () => {
    expect(format("2020-03-15T05:30:10", "h:mm:ss A", "zh")).toBe(
      "5:30:10 上午"
    )
    expect(format("2020-03-15T15:30:10", "h:mm:ss A", "zh")).toBe(
      "3:30:10 下午"
    )
  })
  it("can render a long date and short time", () => {
    expect(format("2100-05-03T04:04:01", { date: "full", time: "short" })).toBe(
      "Monday, May 3, 2100 at 4:04 AM"
    )
  })
  it("can render a long date and short time in Japanese", () => {
    expect(
      format("2100-05-03T04:04:01", { date: "full", time: "short" }, "ja")
    ).toBe("2100年5月3日月曜日 4:04")
  })
  it("can format the russian month of february", () => {
    expect(format("2023-03-14", { date: "medium" }, "ru")).toBe(
      "14 мар. 2023 г."
    )
  })
  it("can include the timezone of a date", () => {
    expect(format("2023-05-05T05:30:10Z", "HH:mm:ss Z", "en")).toBe(
      "01:30:10 -0400"
    )
  })
  it("uses offsets in full date formatting", () => {
    expect(
      format("2023-05-05T05:30:10Z", { date: "full", time: "full" }, "en")
    ).toBe("Friday, May 5, 2023 at 1:30:10 AM -0400")
  })
  it("can filter out the month part", () => {
    expect(
      format(
        "2023-07-05T05:30:10Z",
        "YYYY-MM-DD",
        "en",
        false,
        (part) => part.partName !== "month"
      )
    ).toBe("2023--05")
  })
  it("can format with some escapes and characters", () => {
    expect(
      format("2040-12-17T05:00:00.000Z", "C\\heckin: MMM D, YYYY", "en")
    ).toBe("Checkin: Dec 17, 2040")
  })
})

describe("format with a timezone", () => {
  it("can format a date with a timezone", () => {
    expect(
      format({
        date: "2023-05-07T05:30:10",
        format: "D HH:mm:ss",
        tz: "Europe/Amsterdam",
      })
    ).toBe("7 11:30:10")
  })

  it("can format a date with a timezone", () => {
    expect(
      format({
        date: tzDate("2022-10-29T11:30:50", "America/Los_Angeles"),
        format: "D HH:mm:ss",
        tz: "Asia/Tokyo",
      })
    ).toBe("30 03:30:50")
  })
})
