import { parse } from "@formkit/tempo"

// Nov 31 does not exist!
const date = "2011-11-31"

// Overflows can throw an error
parse({
  date,
  format: "YYYY-MM-DD",
  locale: "en-US",
  dateOverflow: "throw",
})
