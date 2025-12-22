import { describe, it, expect } from "vitest"
import { nearestDay } from "../nearestDay"
process.env.TZ = "America/New_York"

describe("nearestDay", () => {
  it("can find the nearest day to a date", () => {
    expect(
      nearestDay("2023-02-22", (d) => d.getDay() === 6 || d.getDay() === 0)!.toISOString()
    ).toBe("2023-02-25T05:00:00.000Z")

    expect(
      nearestDay("2023-02-21", (d) => d.getDay() === 6 || d.getDay() === 0)!.toISOString()
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
      if (d.getFullYear() === 2023 && d.getMonth() === 0 && d.getDate() === 1) return true
      if (d.getFullYear() === 2024 && d.getMonth() === 1 && d.getDate() === 1) return true
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

  it("can find the 28th from the current month", () => {
    const search = (d: Date) => d.getDate() === 28
    const result = nearestDay(null, search, "month")!
    expect(result.getDate()).toBe(28)
    expect(result.getMonth()).toBe(new Date().getMonth())
    expect(result.getFullYear()).toBe(new Date().getFullYear())
  })
})
