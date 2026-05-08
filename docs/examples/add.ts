import { add } from "@formkit/tempo"

// Add multiple units at once
add("2024-01-01 12:00:00", {
  years: 1,
  months: 3,
  days: 15,
  hours: 2,
  minutes: 8,
  seconds: 40,
})

// Subtract 5 weeks
add("2024-02-05", { weeks: -5 })

// Allow month overflow
add("2024-01-30", { months: 1 }, true)
