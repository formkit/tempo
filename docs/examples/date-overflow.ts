import { parse } from "@formkit/tempo"

// Nov 31 does not exist!
const date = "2011-11-31"

// Default overflow is "backward"
parse(date, "YYYY-MM-DD", "en-US")

// Parse "forward" into December
parse({
  date,
  format: "YYYY-MM-DD",
  locale: "en-US",
  dateOverflow: "forward",
})
