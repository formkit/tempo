import { parse } from "@formkit/tempo"

parse({
  date: "1999-09-02",
  format: "YYYY-MM-DD",
  locale: "en",
  // Remove day info:
  partFilter: (part) => part.partName !== "day",
})

parse({
  date: "1:12:00 PM -0400",
  format: { time: "full" },
  locale: "en-US",
  // Remove TZ info:
  partFilter: (part) => part.partName !== "timeZoneName",
})
