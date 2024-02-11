import { date } from "@formkit/tempo"

// Partial ISO 8601 strings are acceptable
date("2013-11")

// Date at UTC
date("2013-11-18T12:00:00Z")

// Date with an offset (see tzDate() for timezones)
date("2013-11-18T12:00:00-0500")
