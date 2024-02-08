import { offset } from "@formkit/tempo"

const date = new Date()

// Your browser’s offset to UTC
offset(date)
// Your browser’s offset to Hawaii
offset(date, "Pacific/Honolulu")
// Your Hawaii’s offset to UTC
offset(date, "UTC", "Pacific/Honolulu")
// The offset from London to New York today
offset(date, "Europe/London", "America/New_York")
// The offset from Moscow to Kolkata, India
offset(date, "Europe/Moscow", "Asia/Kolkata")

// 👀 Dates matter due to DST:
offset("2023-10-25", "Europe/London", "America/New_York")
offset("2023-10-30", "Europe/London", "America/New_York")
