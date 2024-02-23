import { isAfter } from "@formkit/tempo"

// Compare when the first date is before the second
isAfter("2013-03-15", "2013-03-16")

// Compare when the first date is after the second
isAfter("2013-03-17", "2013-03-16")
