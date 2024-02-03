import { format } from "@formkit/tempo"

const date = new Date()

// These are the same:
format(date, "full")
format(date, { date: "full" })

format(date, "long")
format(date, "medium")
format(date, "short")

// With an explicit locale:
format(date, "full", "it")
