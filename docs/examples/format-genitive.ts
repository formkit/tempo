import { format } from "@formkit/tempo"

const t = "2013-03-15"

// The month name
format({ date: t, format: "MMMM", locale: "ru" })
// The genitive form of the month name
format({
  date: t,
  format: "MMMM",
  locale: "ru",
  genitive: true,
})
