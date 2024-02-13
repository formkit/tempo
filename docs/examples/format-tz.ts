import { format } from "@formkit/tempo"

format({
  date: new Date(),
  format: "HH:mm",
  tz: "Africa/Johannesburg",
})

format({
  date: new Date(),
  format: { time: "short" },
  tz: "America/Los_Angeles",
})

format({
  date: "1999-12-31T20:00Z",
  format: "YYYY-MM-DD HH:mm",
  tz: "Pacific/Chatham",
})
