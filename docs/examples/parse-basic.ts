import { parse, format } from "@formkit/tempo"

// ISO 8601 is the default format
parse("1987-12-17")

// Sample date formats
parse("March 7, 1999", "MMMM D, YYYY", "en-US")
parse("12/17/1929", "MM/DD/YYYY")
parse("09-11-2049", "DD-MM-YYYY")
parse("Feb 11, 2011", "MMM D, YYYY")
parse("5 September 1987", "D MMMM YYYY")
parse("1982-05-17T07:44:00+0000", "YYYY-MM-DDTHH:mm:ssZ")
parse("23/08/1994 07:44 PM", "DD/MM/YYYY hh:mm A")
parse("1964-01-12 19:44:00", "YYYY-MM-DD HH:mm:ss")
parse("04/27/1942 07:44:00 PM", "MM/DD/YYYY hh:mm:ss A")

// Parse only time
parse("07:44", "HH:mm")
// Time parsed as utc
parse("07:44 -0000", "HH:mm ZZ")

const str = "Thursday, December 17, 1987"
parse(str, "full", "en-US")

const today = format(new Date(), { time: "short", date: "long" })
parse(today, { time: "short", date: "long" }, "en-US")
