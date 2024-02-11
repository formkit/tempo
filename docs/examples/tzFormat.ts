import { format } from "@formkit/tempo"

const date = new Date()
// Time in New York?
format({
  date,
  format: "hh:mm a",
  tz: "America/New_York",
})

// Time in Tokyo?
format({
  date,
  format: "hh:mm a",
  tz: "Asia/Tokyo",
})
