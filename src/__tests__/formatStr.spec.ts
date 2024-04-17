import { describe, it, expect } from "vitest"
import { formatStr } from "../formatStr"
import { format } from "../format"
process.env.TZ = "America/New_York"

describe("formatStr", () => {
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
    expect(formatStr({ time: "long" }, "en")).toEqual("h:mm:ss A ZZ")
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
  it("uses the ZZ token for long time", () => {
    expect(formatStr({ time: "long" }, "en")).toBe("h:mm:ss A ZZ")
  })
  it("uses the Z token for full time", () => {
    expect(formatStr({ time: "full" }, "en")).toBe("h:mm:ss A Z")
  })
})
