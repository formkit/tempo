import { format, parse } from "@formkit/tempo"

// Format with milliseconds using SSS token
const d = new Date("2024-01-15T10:30:45.789Z")
format({ date: d, format: "HH:mm:ss.SSS", tz: "UTC" })
format({ date: d, format: "YYYY-MM-DDTHH:mm:ss.SSSZ", tz: "UTC" })

// SSS always outputs 3 digits, padding with zeros
const d2 = new Date("2024-01-15T10:30:45.007Z")
format({ date: d2, format: "ss.SSS", tz: "UTC" })

// Parse milliseconds - SSS accepts variable-length input
parse("10:30:45.789", "HH:mm:ss.SSS")
// 1 digit -> 700ms
parse("10:30:45.7", "HH:mm:ss.SSS")
// 2 digits -> 780ms
parse("10:30:45.78", "HH:mm:ss.SSS")
// 6 digits -> 123ms (truncates to ms)
parse("10:30:45.123456", "HH:mm:ss.SSS")
