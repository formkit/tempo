import { format, parse } from "@formkit/tempo"

const x = format(new Date(), "MM/DD/YYYY")

parse("2012-01-01")

console.log(x)
