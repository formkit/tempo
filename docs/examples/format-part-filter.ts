import { format, tzDate, weekEnd } from "@formkit/tempo"

// "full" time normally looks like:
// `10:51:29 PM -0500`
// We can selectively remove the offset:
format({
  date: new Date(),
  format: { time: "full" },
  partFilter: (part) => {
    // Remove the offset
    return part.partName !== "timeZoneName"
  },
})
