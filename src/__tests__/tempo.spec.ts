import { describe, it, expect, beforeEach } from "vitest"

import {
  iso8601,
  monthStart,
  monthDays,
  monthEnd,
  weekStart,
  weekEnd,
  addDay,
  addYear,
  addMonth,
  format,
  formatStr,
  sameDay,
  parse,
  parts,
  date,
  offset,
  range,
  applyOffset,
  removeOffset,
  nearestDay,
  yearDays,
  dayOfYear,
} from "../index"
import { validOffset } from "../common"

/**
 * Create a new array of the given length filled with a specific type.
 * @param length - The length of the array to create
 * @param fill - Fill with a given value
 * @returns
 */
export function r<T>(length: number, fill: (index: number) => T): T[] {
  return new Array(length).fill("").map((_x, i) => fill(i))
}

const locales = [
  "ar",
  "az",
  "bg",
  "ca",
  "zh",
  "hr",
  "cs",
  "da",
  "nl",
  "fi",
  "fr",
  "de",
  "el",
  "he",
  "hu",
  "id",
  "it",
  "ja",
  "kk",
  "ko",
  "nb",
  "fa",
  "pl",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "es",
  "sv",
  "tg",
  "th",
  "uk",
  "uz",
  "tr",
  "vi",
]

beforeEach(() => {
  process.env.TZ = "America/New_York"
})

describe("validating ISO 8601", () => {
  it("validates full dates", () =>
    expect(iso8601("2022-01-22 00:00:00")).toBe(true))
  it("validates full dates with T", () =>
    expect(iso8601("2022-01-22T23:59:59")).toBe(true))
  it("does allow ancient dates", () =>
    expect(iso8601("0032-06-15 00:00:00")).toBe(true))
  it("does allow milliseconds", () =>
    expect(iso8601("0032-06-15 00:00:00.456")).toBe(true))
  it("does now allow 24 hours", () =>
    expect(iso8601("2022-01-22 24:00:00")).toBe(false))
  it("does now allow 60 minutes", () =>
    expect(iso8601("2022-01-22 00:60:00")).toBe(false))
  it("does now allow 60 seconds", () =>
    expect(iso8601("2022-01-22 00:00:60")).toBe(false))
  it("does now allow 13 months", () =>
    expect(iso8601("2022-13-22 00:00:00")).toBe(false))
  it("does now allow 10,000 years", () =>
    expect(iso8601("10000-01-01 00:00:00")).toBe(false))
  it("does now allow 40 days", () =>
    expect(iso8601("2000-01-40 00:00:00")).toBe(false))
  it("allows a lot of decimals", () =>
    expect(iso8601("2000-01-30 00:00:00.0000000000")).toBe(true))
})

describe("date", () => {
  it("qualifies and re-timezones a date", () => {
    expect(date("2022-01-22 00:00:00").toISOString()).toBe(
      "2022-01-22T05:00:00.000Z"
    )
  })
  it("accepts a time with a timezone offset", () => {
    expect(date("2022-01-22T00:00-0300").toISOString()).toBe(
      "2022-01-22T03:00:00.000Z"
    )
  })
})

describe("monthStart", () => {
  it("gets the first of a month from the middle of the month", () => {
    expect(monthStart("1986-03-17T00:00:00Z").toISOString()).toBe(
      "1986-03-01T05:00:00.000Z"
    )
  })
  it("gets the first day of the previous month when the time is in UTC", () => {
    expect(monthStart("2000-01-01T00:00:00Z").toISOString()).toBe(
      "1999-12-01T05:00:00.000Z"
    )
  })
  it("gets the first day of the current month when the time is local", () => {
    expect(monthStart("2000-01-01T00:00:00").toISOString()).toBe(
      "2000-01-01T05:00:00.000Z"
    )
  })
})

describe("monthEnd", () => {
  it("gets the correct last day of Feb on leap years", () => {
    expect(monthEnd("2020-02-01").toISOString()).toBe(
      "2020-02-29T05:00:00.000Z"
    )
  })
  it("gets the correct last day of August", () => {
    expect(monthEnd("1999-08-01").toISOString()).toBe(
      "1999-08-31T04:00:00.000Z"
    )
  })
  it("gets the correct last day when starting from the last day", () => {
    expect(monthEnd("2020-01-31T05:00:00.000Z").toISOString()).toBe(
      "2020-01-31T05:00:00.000Z"
    )
  })
})

describe("monthDays", () => {
  it("gets the correct number of december days", () => {
    expect(monthDays("2020-12-01")).toBe(31)
  })
  it("gets the correct number of april days", () => {
    expect(monthDays("2020-04-01")).toBe(30)
  })
  it("gets the correct number of Feb days on non leap years", () => {
    expect(monthDays("2022-02-01")).toBe(28)
  })
  it("gets the correct number of Feb days on leap years", () => {
    expect(monthDays("2020-02-01")).toBe(29)
  })
})

describe("weekStart", () => {
  it("gets the correct first day of the week when the first day is in the middle of the week", () => {
    expect(weekStart("2022-12-01").toISOString()).toBe(
      "2022-11-27T05:00:00.000Z"
    )
    expect(weekStart("2022-03-16").toISOString()).toBe(
      "2022-03-13T05:00:00.000Z"
    )
  })
  it("gets the first day of the week, when it is the first day of the week", () => {
    expect(weekStart("2022-05-01 00:00:00").toISOString()).toBe(
      "2022-05-01T04:00:00.000Z"
    )
  })

  it("gets the first day of the week when shifted to monday", () => {
    expect(weekStart("2022-11-05 10:00:00", 1).toISOString()).toBe(
      "2022-10-31T04:00:00.000Z"
    )
  })

  it("gets the first day of the week, when the day is shifted to wednesday and it is tuesday", () => {
    expect(weekStart("2022-11-01", 3).toISOString()).toBe(
      "2022-10-26T04:00:00.000Z"
    )
  })
  it("gets the first day of the week, when the day is shifted to wednesday and it is thursday", () => {
    expect(weekStart("2022-11-03", 3).toISOString()).toBe(
      "2022-11-02T04:00:00.000Z"
    )
  })
})

describe("weekEnd", () => {
  it("gets the last day of the week", () => {
    expect(weekEnd("2022-11-28T00:00:00").toISOString()).toBe(
      "2022-12-04T04:59:59.000Z"
    )
  })
  it("gets the last day of the week when offset to tuesday", () => {
    expect(weekEnd("2022-07-08T00:00:00", 2).toISOString()).toBe(
      "2022-07-12T03:59:59.000Z"
    )
  })
  it("gets the last day of the week when offset to wednesday and the day is thursday", () => {
    expect(weekEnd("2022-10-13", 3).toISOString()).toBe(
      "2022-10-19T03:59:59.000Z"
    )
  })
  it("gets the last day of the week when offset to wednesday and the day is monday", () => {
    expect(weekEnd("2022-10-10", 3).toISOString()).toBe(
      "2022-10-12T03:59:59.000Z"
    )
  })
})

describe("addDay", () => {
  it("gets the next day at the beginning of the month", () => {
    expect(addDay("2022-01-01").toISOString()).toBe("2022-01-02T05:00:00.000Z")
  })
  it("gets the next day at the end of the year", () => {
    expect(addDay("2022-12-31").toISOString()).toBe("2023-01-01T05:00:00.000Z")
  })
})

describe("addMonth", () => {
  it("gets the next month on the first", () => {
    expect(addMonth("2022-01-01").toISOString()).toBe(
      "2022-02-01T05:00:00.000Z"
    )
  })
  it("can overflow a month month when the next month has fewer days", () => {
    expect(addMonth("2000-01-31", 1, true).toISOString()).toBe(
      "2000-03-02T05:00:00.000Z"
    )
  })
  it("goe to the same day of the month on the next month", () => {
    expect(addMonth("2000-06-04").toISOString()).toBe(
      "2000-07-04T04:00:00.000Z"
    )
  })

  it("can add multiple months by passing a second argument", () => {
    expect(addMonth("2000-01-01", 2).toISOString()).toBe(
      "2000-03-01T05:00:00.000Z"
    )
  })

  it("can add years months by passing a second argument", () => {
    expect(addMonth("2000-01-01", 25).toISOString()).toBe(
      "2002-02-01T05:00:00.000Z"
    )
  })
  it("can prevent month overflow with third argument", () => {
    expect(addMonth("2020-01-31", 1, false).toISOString()).toBe(
      "2020-02-29T05:00:00.000Z"
    )
  })
})

describe("sameDay", () => {
  it("can determine two dates are the exact same", () => {
    expect(sameDay(new Date(), new Date())).toBe(true)
  })

  it("can compare a string against a date object", () => {
    expect(sameDay("1999-12-17", new Date("1999-12-17T10:00:00Z"))).toBe(true)
  })

  it("evaluates false for the same dates in different years", () => {
    expect(sameDay("1999-12-17", new Date("2020-12-17T00:10:00Z"))).toBe(false)
  })

  it("evaluates false for the same dates in different months", () => {
    expect(sameDay("2020-11-17", new Date("2020-12-17T10:00:00Z"))).toBe(false)
  })

  it("evaluates false for two adjacent days", () => {
    expect(sameDay("2020-11-17", new Date("2020-11-18T10:00:00Z"))).toBe(false)
  })
})

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

describe("part parsing", () => {
  it("can parse en locale full date format into parts", () => {
    expect(formatStr("full", "en")).toEqual("dddd, MMMM D, YYYY")
  })

  it("can parse a french locale full date format into parts", () => {
    expect(formatStr("full", "ja")).toEqual("YYYY年M月D日dddd")
  })

  it("can parse en locale short date formats into parts", () => {
    expect(formatStr("short", "en")).toEqual("M/D/YY")
  })

  it("can parse zh locale full date format into parts", () => {
    expect(formatStr("full", "zh")).toEqual("YYYY年M月D日dddd")
  })

  it("can parse zh locale long date format into parts", () => {
    expect(formatStr("long", "zh")).toEqual("YYYY年M月D日")
  })

  it("can parse en locale short date formats into parts", () => {
    expect(formatStr("short", "zh")).toEqual("YYYY/M/D")
  })

  it("can parse en locale with full date in object format", () => {
    expect(formatStr({ date: "full" }, "en")).toEqual("dddd, MMMM D, YYYY")
  })

  it("can parse en locale with full time in object format", () => {
    expect(formatStr({ time: "full" }, "en")).toEqual("h:mm:ss A Z")
  })

  it("can parse en locale with long time in object format", () => {
    expect(formatStr({ time: "long" }, "en")).toEqual("h:mm:ss A Z")
  })

  it("can parse en locale with medium time in object format", () => {
    expect(formatStr({ time: "medium" }, "en")).toEqual("h:mm:ss A")
  })

  it("can parse en locale with short time in object format", () => {
    expect(formatStr({ time: "short" }, "en")).toEqual("h:mm A")
  })
  it("can parse en locale with short time and long date in object format", () => {
    expect(formatStr({ date: "long", time: "short" }, "en")).toEqual(
      "MMMM D, YYYY at h:mm A"
    )
  })
  it("does not count escaped characters as parts", () => {
    expect(format("2023-01-01T13:14Z", "MMM D \\at hh:mm A")).toBe(
      "Jan 1 at 08:14 AM"
    )
  })
})

describe("getRange", () => {
  it("can return single digit month ranges", () => {
    expect(range("M")).toEqual([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ])
  })
  it("can return double digit month ranges", () => {
    expect(range("MM")).toEqual([
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ])
  })
  it("can return short month ranges", () => {
    expect(range("MMM")).toEqual([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ])
  })
  it("can return long month ranges", () => {
    expect(range("MMMM")).toEqual([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ])
  })
  it("can return long month ranges in italian", () => {
    expect(range("MMMM", "it")).toEqual([
      "gennaio",
      "febbraio",
      "marzo",
      "aprile",
      "maggio",
      "giugno",
      "luglio",
      "agosto",
      "settembre",
      "ottobre",
      "novembre",
      "dicembre",
    ])
  })
  it("can return long month ranges in russian", () => {
    expect(range("MMMM", "ru")).toEqual([
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ])
  })
  it("can return short month ranges in russian", () => {
    expect(range("MMM", "ru")).toEqual([
      "янв.",
      "февр.",
      "март",
      "апр.",
      "май",
      "июнь",
      "июль",
      "авг.",
      "сент.",
      "окт.",
      "нояб.",
      "дек.",
    ])
  })
  it("can return all the short days in english", () => {
    expect(range("ddd", "en")).toEqual([
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ])
  })
  it("can return all the short days in french", () => {
    expect(range("ddd", "fr")).toEqual([
      "dim.",
      "lun.",
      "mar.",
      "mer.",
      "jeu.",
      "ven.",
      "sam.",
    ])
  })
  it("can return all the long days in english", () => {
    expect(range("dddd", "en")).toEqual([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
  })
  it("can return all the short days in english", () => {
    expect(range("d", "en")).toEqual(["S", "M", "T", "W", "T", "F", "S"])
  })
  it("can return a 100 year range starting from the current year in 2 digits", () => {
    const year = new Date().getFullYear()
    const years = []
    for (let i = -120; i < 120; i++) {
      years.push(`${year + i}`.substring(2))
    }
    expect(range("YY")).toEqual(years)
  })
  it("can return a 100 year range starting from the current year in 4 digits", () => {
    const year = new Date().getFullYear()
    const years = []
    for (let i = -120; i < 120; i++) {
      years.push(`${year + i}`)
    }
    expect(range("YYYY")).toEqual(years)
  })

  it("can be return the am/pm range", () => {
    expect(range("a")).toEqual(["am", "pm"])
  })
  it("can be return the am/pm range", () => {
    expect(range("A")).toEqual(["AM", "PM"])
  })
  it("can be return the am/pm range in japan", () => {
    expect(range("A", "ja")).toEqual(["午前", "午後"])
  })
  it("can return the single digit day of the month range", () => {
    expect(range("DD")).toEqual(
      r(31, (i) => `${i + 1 < 10 ? "0" : ""}${i + 1}`)
    )
  })
  it("can return the single digit day of the month range", () => {
    expect(range("D")).toEqual(r(31, (i) => `${i + 1}`))
  })
  it("can return the single digit 24 hours of a day", () => {
    expect(range("H")).toEqual(r(24, (i) => `${i}`))
  })
  it("can return the double digit 24 hours of a day", () => {
    expect(range("HH")).toEqual(r(24, (i) => `${i < 10 ? "0" : ""}${i}`))
  })
  it("can return the single digit 12 hours of a day", () => {
    expect(range("h")).toEqual(r(12, (i) => `${i + 1}`))
  })
  it("can return the double digit 12 hours of a day", () => {
    expect(range("hh")).toEqual(
      r(12, (i) => `${i + 1 < 10 ? "0" : ""}${i + 1}`)
    )
  })
  it("can return the single digit 59 minutes", () => {
    expect(range("mm")).toEqual(r(60, (i) => `${i < 10 ? "0" : ""}${i}`))
  })
  it("can return the double digit 59 minutes", () => {
    expect(range("m")).toEqual(r(60, (i) => `${i}`))
  })
  it("can return the single digit 59 seconds", () => {
    expect(range("s")).toEqual(r(60, (i) => `${i}`))
  })
  it("can return the double digit 59 minutes", () => {
    expect(range("ss")).toEqual(r(60, (i) => `${i < 10 ? "0" : ""}${i}`))
  })
})

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

describe("parts", () => {
  it("can determine a cyrillic long vs short month", () => {
    expect(parts("long", "ru").find((p) => p.partName === "month")?.token).toBe(
      "MMMM"
    )
  })
})

describe("addYear", () => {
  it("can add a year to a Date object by default", () => {
    const d = new Date("2000-12-17T12:00:00")
    const h: number = d.getTimezoneOffset() / 60
    expect(addYear(d).toISOString()).toBe(`2001-12-17T${12 + h}:00:00.000Z`)
  })
  it("can subtract a year to a Date", () => {
    const d = new Date("2000-12-17T12:00:00")
    const h: number = d.getTimezoneOffset() / 60
    expect(addYear(d, -1).toISOString()).toBe(`1999-12-17T${12 + h}:00:00.000Z`)
  })
  it("can overflow the day of the month on leap year", () => {
    expect(addYear("2000-02-29").toISOString()).toBe("2001-02-28T05:00:00.000Z")
  })
})

describe("validOffset", () => {
  it("returns its own value when valid", () => {
    expect(validOffset("+0000")).toBe("+0000")
    expect(validOffset("+0100")).toBe("+0100")
  })
})

describe("month ranges", () => {
  it('generates "short" months in each locale that matches dates date dateStyle "short" months.', () => {
    const monthRanges = locales.map((locale) =>
      range("MMM", locale, true).map((m) => m.toLowerCase())
    )
    const renderedMonthRanges: string[][] = []
    locales.forEach((locale) => {
      const monthNames = []
      for (let month = 1; month <= 12; month++) {
        const date = new Date(
          `2020-${String(month).padStart(2, "0")}-01T00:00:00`
        )
        const parts = new Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
        }).formatToParts(date)
        monthNames.push(
          parts.find((part) => part.type === "month")!.value.toLowerCase()
        )
      }
      renderedMonthRanges.push(monthNames)
    })
    expect(monthRanges).toEqual(renderedMonthRanges)
  })
  it('generates "long" months in each locale that matches dates date dateStyle "long" months.', () => {
    const monthRanges = locales.map((locale) =>
      range("MMMM", locale, true).map((m) => m.toLowerCase())
    )
    const renderedMonthRanges: string[][] = []
    locales.forEach((locale) => {
      const monthNames = []
      for (let month = 1; month <= 12; month++) {
        const date = new Date(
          `2020-${String(month).padStart(2, "0")}-01T00:00:00`
        )
        const parts = new Intl.DateTimeFormat(locale, {
          dateStyle: "long",
        }).formatToParts(date)
        monthNames.push(
          parts.find((part) => part.type === "month")!.value.toLowerCase()
        )
      }
      renderedMonthRanges.push(monthNames)
    })
    expect(monthRanges).toEqual(renderedMonthRanges)
  })
})

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

describe("applyOffset", () => {
  it("can apply a negative offset to a date", () => {
    expect(applyOffset("2023-02-22T00:00:00Z", "-0500").toISOString()).toBe(
      "2023-02-21T19:00:00.000Z"
    )
  })

  it("can apply a positive offset to a date", () => {
    expect(applyOffset("2023-04-13T10:15:00", "+0200").toISOString()).toBe(
      "2023-04-13T16:15:00.000Z"
    )
  })
})
describe("removeOffset", () => {
  it("can apply a negative offset to a date", () => {
    expect(
      removeOffset("2023-02-21T19:00:00.000Z", "-0500").toISOString()
    ).toBe("2023-02-22T00:00:00.000Z")
  })

  it("can apply a positive offset to a date", () => {
    expect(
      removeOffset("2023-04-13T16:15:00.000Z", "+0200").toISOString()
    ).toBe("2023-04-13T14:15:00.000Z")
  })
})

describe("yearDays", () => {
  it("can find the number of days in a year", () => {
    expect(yearDays("2023-01-01")).toBe(365)
  })
  it("can find the number of days in a year", () => {
    expect(yearDays("2020-01-01")).toBe(366)
  })
})

describe("dayOfYear", () => {
  it("can find the number of days in a year", () => {
    expect(dayOfYear("2023-08-01")).toBe(213)
  })
  it("can find the number of days in a year", () => {
    expect(dayOfYear("2020-08-01")).toBe(214)
  })
})

describe("nearestDay", () => {
  it("can find the nearest day to a date", () => {
    expect(
      nearestDay(
        "2023-02-22",
        (d) => d.getDay() === 6 || d.getDay() === 0
      )!.toISOString()
    ).toBe("2023-02-25T05:00:00.000Z")

    expect(
      nearestDay(
        "2023-02-21",
        (d) => d.getDay() === 6 || d.getDay() === 0
      )!.toISOString()
    ).toBe("2023-02-19T05:00:00.000Z")
  })
  it("searches following the pattern 0, 1, -1, 2, -2, 3 -3 and so on", () => {
    const deltas: number[] = []
    nearestDay(
      "2023-02-21",
      (d) => {
        deltas.push(d.getDate() - 21)
        return false
      },
      5
    )
    expect(deltas).toEqual([0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5])
  })
  it("can constrain itself to a month, not moving backwards", () => {
    const search = (d: Date): boolean => {
      if (d.getDate() === 30) return true
      if (d.getDate() === 25) return true
      return false
    }
    expect(nearestDay("2023-02-05", search, "month")!.toISOString()).toBe(
      "2023-02-25T05:00:00.000Z"
    )
  })
  it("can constrain itself to a month, not moving forwards", () => {
    const search = (d: Date): boolean => {
      if (d.getMonth() === 2 && d.getDate() === 2) return true
      if (d.getMonth() === 1 && d.getDate() === 1) return true
      return false
    }
    expect(nearestDay("2023-02-25", search, "month")!.toISOString()).toBe(
      "2023-02-01T05:00:00.000Z"
    )
  })
  it("can constrain itself to a week, not moving backwards", () => {
    const search = (d: Date): boolean => {
      if (d.getDate() === 24) return true
      if (d.getDate() === 4) return true
      return false
    }
    expect(nearestDay("2023-02-27", search, "week")!.toISOString()).toBe(
      "2023-03-04T05:00:00.000Z"
    )
  })
  it("can constrain itself to a week, not moving forwards", () => {
    const search = (d: Date): boolean => {
      if (d.getDate() === 26) return true
      if (d.getDate() === 5) return true
      return false
    }
    expect(nearestDay("2023-03-03", search, "week")!.toISOString()).toBe(
      "2023-02-26T05:00:00.000Z"
    )
  })
  it("can constrain itself to a year, not moving forwards", () => {
    const search = (d: Date): boolean => {
      if (d.getFullYear() === 2023 && d.getMonth() === 0 && d.getDate() === 1)
        return true
      if (d.getFullYear() === 2024 && d.getMonth() === 1 && d.getDate() === 1)
        return true
      return false
    }
    expect(nearestDay("2023-11-03", search, "year")!.toISOString()).toBe(
      "2023-01-01T05:00:00.000Z"
    )
  })
  it("can constrain itself to a year, not moving backwards", () => {
    const search = (d: Date): boolean => {
      if (d.getFullYear() === 2023 && d.getMonth() === 11 && d.getDate() === 31)
        return true
      if (d.getFullYear() === 2024 && d.getMonth() === 11 && d.getDate() === 31)
        return true
      return false
    }
    expect(nearestDay("2023-01-01", search, "year")!.toISOString()).toBe(
      "2023-12-31T05:00:00.000Z"
    )
  })
})
