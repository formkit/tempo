import { parts, parseParts } from "@formkit/tempo"

const dateStr = "2021-01-01"
const format = "YYYY-MM-DD"
const locale = "en-US"
const formatParts = parts(format, locale)
parseParts(dateStr, formatParts)
