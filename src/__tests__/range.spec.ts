import { describe, it, expect } from "vitest"
import { range } from "../range"
process.env.TZ = "America/New_York"

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
