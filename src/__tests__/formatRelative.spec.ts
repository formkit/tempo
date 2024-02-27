import { describe, it, expect } from "vitest"
import { formatRelative } from "../formatRelative"
process.env.TZ = "America/New_York"

describe("format", () => {
  it('renders "minutes" relative date', () => {
    expect(
      formatRelative(new Date(new Date().getTime() - 1000 * 60 * 4), {
        unit: "minute",
      }),
    ).toEqual("4 minutes ago")
  })

  it('renders "long" relative date', () => {
    expect(
      formatRelative(new Date(new Date().setMonth(new Date().getMonth() - 2)), {
        style: "long",
      }),
    ).toEqual("2 months ago")
  })

  it('renders "short" relative date', () => {
    expect(
      formatRelative(
        new Date(new Date().setFullYear(new Date().getFullYear() - 2)),
        {
          style: "short",
        },
      ),
    ).toEqual("2 yr. ago")
  })

  it('renders "narrow" relative date', () => {
    expect(
      formatRelative(new Date(new Date().setMonth(new Date().getMonth() - 2)), {
        style: "narrow",
      }),
    ).toEqual("2mo ago")
  })

  it("renders ukrainian relative date", () => {
    expect(
      formatRelative(new Date(new Date().setMonth(new Date().getMonth() - 2)), {
        locale: "uk",
      }),
    ).toEqual("2 місяці тому")
  })

  it("renders relative date with a unit", () => {
    expect(
      formatRelative(
        new Date(new Date().getTime() - 60 * 24 * 60 * 60 * 1000),
        {
          unit: "days",
        },
      ),
    ).toEqual("60 days ago")
  })
})

// describe("format with a timezone", () => {
//   it("can format a date with a timezone", () => {
//     expect(
//       formatRelative("2024-02-27T20:00:00-0500", {
//         tz: "Europe/Amsterdam",
//       }),
//     ).toBe("7 11:30:10")
//   })
// })
