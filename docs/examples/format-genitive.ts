import { format } from "@formkit/tempo"

const t = "2013-03-15"

// The month name
format(t, "MMMM", "ru")
// The genitive form of the month name
format(t, "MMMM", "ru", true)
