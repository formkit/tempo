import { add, diff } from "@formkit/tempo"

// Get a duration object
diff("2025-04-01 12:00:50", "2024-01-01 12:00:00")

// Skip units you do not want in the result
diff("2025-07-01 12:01:00", "2024-01-01 12:00:00", {
  skip: ["years", "minutes"],
})

// Apply a duration to another date
add("2024-01-30", diff("2024-03-01", "2024-01-30"))
