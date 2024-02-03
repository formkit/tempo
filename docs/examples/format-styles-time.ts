import { format } from "@formkit/tempo"

const date = "2010-06-09T15:32:00Z"

format(date, { time: "full" })
format(date, { time: "long" })
format(date, { time: "medium" })
format(date, { time: "short" })

// With a date style
format(date, { date: "full", time: "short" })
format(date, { date: "medium", time: "long" })

// With an explicit locale:
format(date, "full", "fr")
