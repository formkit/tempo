import { isEqual } from "@formkit/tempo"

// Compare when the first date is before the second
isEqual("2013-03-15", "2013-03-16")

// Compare when the first date is equal with the second
isEqual("2013-03-16", "2013-03-16")
