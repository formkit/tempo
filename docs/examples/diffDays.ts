import { diffDays } from "@formkit/tempo"

diffDays("2021-07-03", "2021-01-01")
// lets round the difference
diffDays("2025-02-07T18:31:00Z", "2025-02-05T05:31:00Z", "round")
