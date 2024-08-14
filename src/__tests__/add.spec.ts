import { describe, expect, it } from "vitest"
import { add } from "../add"
import { date } from "../date"

describe("add", () => {
  it("should add to result into 2025-04-16 14:08:40", () => {
    const a = "2024-01-01 12:00:00"

    expect(
      add(a, {
        years: 1,
        months: 3,
        days: 15,
        hours: 2,
        minutes: 8,
        seconds: 40,
      })
    ).toEqual(date("2025-04-16 14:08:40"))
  })

  it("should overflow", () => {
    expect(
      add(
        "2024-01-30",
        {
          months: 1,
        },
        true
      )
    ).toEqual(date("2024-03-01"))
  })

  it("should remove 5 weeks", () => {
    expect(
      add("2024-02-05", {
        weeks: -5,
      })
    ).toEqual(date("2024-01-01"))
  })
})
