import { format, offset, removeOffset } from "@formkit/tempo"

// rendered at:
const d = new Date()

// local time:
format(d, "HH:mm")

const offsetToBerlin = offset(d, "Europe/Berlin")
const adjusted = removeOffset(d, offsetToBerlin)
// The time in Berlin
format(adjusted, "HH:mm")
