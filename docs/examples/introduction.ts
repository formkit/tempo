import { format, parse } from "@formkit/tempo"

const readable = format(new Date(), "full")

parse(readable, "full")
