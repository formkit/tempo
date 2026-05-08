<script lang="ts" setup>
import sizes from "../../assets/func-sizes.json"
import type { FunctionRef, ObjectRef } from "../../src/types"

const durationProperties: ObjectRef["properties"] = [
  { name: "years?", type: "number", jsdoc: ["Years to add."] },
  { name: "months?", type: "number", jsdoc: ["Months to add."] },
  { name: "weeks?", type: "number", jsdoc: ["Weeks to add."] },
  { name: "days?", type: "number", jsdoc: ["Days to add."] },
  { name: "hours?", type: "number", jsdoc: ["Hours to add."] },
  { name: "minutes?", type: "number", jsdoc: ["Minutes to add."] },
  { name: "seconds?", type: "number", jsdoc: ["Seconds to add."] },
  { name: "milliseconds?", type: "number", jsdoc: ["Milliseconds to add."] },
]

const fns: Record<
  string,
  {
    name: string
    description: string
    return: string
    arguments: FunctionRef["arguments"]
    example?: string
    tip?: string
  }
> = {
  add: {
    name: "add",
    description:
      "Returns a new Date object with a duration object applied. To subtract time, use negative values. Month and year overflow behavior matches <code>addMonth</code> and <code>addYear</code>.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "duration",
        type: "Duration",
      },
      {
        name: "dateOverflow",
        type: "boolean",
        comment: "default: false",
      },
    ],
    example: "add",
  },
  addDay: {
    name: "add-day",
    description:
      "Returns a new Date object with a positive or negative number of days applied to date argument. To subtract days, use a negative number.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "amount",
        type: "number",
      },
    ],
    example: "addDay",
  },
  addHour: {
    name: "add-hour",
    description:
      "Returns a new Date object with a positive or negative number of hours applied to date argument. To subtract hours, use a negative number.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "amount",
        type: "number",
      },
    ],
  },
  addMinute: {
    name: "add-minute",
    description:
      "Returns a new Date object with a positive or negative number of minutes applied to date argument. To subtract minutes, use a negative number.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "amount",
        type: "number",
      },
    ],
  },
  addMillisecond: {
    name: "add-millisecond",
    description:
      "Returns a new Date object with a positive or negative number of milliseconds applied to date argument. To subtract milliseconds, use a negative number.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "amount",
        type: "number",
      },
    ],
  },
  addMonth: {
    name: "add-month",
    description: `Returns a new Date object with a positive or negative number of
    months applied to date argument. To subtract months, use a negative number.
    Sometimes the result will "overflow" the available days of
    the result month. For example when adding 1 month to January 31st the
    resulting date would be February 31st, which does not exist. By default, the
    date will be set to the last day of February but you could opt for it
    to "overflow" into March by setting <code>dateOverflow</code> to
    <code>true</code>.`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "amount",
        type: "number",
      },
      {
        name: "dateOverflow",
        type: "boolean",
      },
    ],
  },
  addSecond: {
    name: "add-second",
    description:
      "Returns a new Date object with a positive or negative number of seconds applied to date argument. To subtract seconds, use a negative number.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "amount",
        type: "number",
      },
    ],
  },
  addYear: {
    name: "add-year",
    description: `Returns a new Date object with a positive or negative number of years
      applied to date argument. To subtract years, use a negative number.
      Sometimes the result will "overflow" the available days of
      the result month. For example when adding 1 year to February 29, 2024 the
      resulting date would be February 29, 2025, which does not exist (2025 is
      not a leap year). By default, the date will be set to February 28, 2025 but
      you could opt for it to "overflow" into March by setting
      <code>dateOverflow</code> to <code>true</code>.`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "amount",
        type: "number",
      },
      {
        name: "dateOverflow",
        type: "boolean",
      },
    ],
  },
  applyOffset: {
    name: "apply-offset",
    description: `Returns a new Date object with a timezone offset applied to date argument
      — this function does fundamentally change the date but can be very useful
      when working with timezones. Read more in the timezone section.`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "offset",
        type: "string",
        comment: "+-HHmm, ex: -0800",
      },
    ],
    example: "applyOffset",
  },
  date: {
    name: "date",
    description: `Converts an ISO 8601 like string into a Date object (noop on <code>Date</code> objects). ISO 8601 strings do not need to be complete to be accepted, but you need at least a year and month.`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
    example: "date",
    tip: 'To produce a date in a given timezone either include the offset in the date string (ex: "2021-01-01T00:00:00-0800") or use the <code>tzDate</code> function.',
  },
  dayEnd: {
    name: "day-end",
    description: `Returns a new Date object with the time set to 23:59:59.999 (local time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  dayStart: {
    name: "day-start",
    description: `Returns a new Date object with the time set to 00:00:00.000 (local time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  hourEnd: {
    name: "hour-end",
    description: `Returns a new Date object with the minutes part of the time set to 59:59.999 (local time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  hourStart: {
    name: "hour-start",
    description: `Returns a new Date object with the minutes part of the time set to 00:00.000 (local time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  minuteEnd: {
    name: "minute-end",
    description: `Returns a new Date object with the seconds part of the time set to 59.999 (local time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  minuteStart: {
    name: "minute-start",
    description: `Returns a new Date object with the seconds part of the time set to 00.000 (local time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  monthEnd: {
    name: "month-end",
    description: `Returns a new Date object with the date set to the last day of the current month (does not modify the time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  monthStart: {
    name: "month-start",
    description: `Returns a new Date object with the date set to the first day of the current month and the time set to 00:00:00 (local).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  removeOffset: {
    name: "remove-offset",
    description: `Returns a new Date object with the inverse of the specified offset applied. This can be helpful to normalize time information across timezones.`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "offset",
        type: "string",
        comment: "+-HHmm, ex: -0800",
      },
    ],
  },
  setDayOfMonth: {
    name: "set-day-of-month",
    description:
      "Returns a new Date object with the day of the month set. By default, days beyond the end of the month clamp to the last day; set <code>dateOverflow</code> to <code>true</code> to allow overflow.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "day",
        type: "number",
      },
      {
        name: "dateOverflow",
        type: "boolean",
        comment: "default: false",
      },
    ],
  },
  setHour: {
    name: "set-hour",
    description:
      "Returns a new Date object with the hour set. Values outside 0-23 use the native Date overflow behavior.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "hour",
        type: "number",
        comment: "0-23",
      },
    ],
  },
  setMilliseconds: {
    name: "set-milliseconds",
    description:
      "Returns a new Date object with the millisecond value set. Values outside 0-999 use the native Date overflow behavior.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "milliseconds",
        type: "number",
        comment: "0-999",
      },
    ],
  },
  setMinutes: {
    name: "set-minutes",
    description:
      "Returns a new Date object with the minute set. Values outside 0-59 use the native Date overflow behavior.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "minute",
        type: "number",
        comment: "0-59",
      },
    ],
  },
  setMonth: {
    name: "set-month",
    description:
      "Returns a new Date object with the zero-based month set. By default, invalid days clamp to the last day of the target month; set <code>dateOverflow</code> to <code>true</code> to allow overflow.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "month",
        type: "number",
        comment: "0-11, 0 is January",
      },
      {
        name: "dateOverflow",
        type: "boolean",
        comment: "default: false",
      },
    ],
  },
  setSeconds: {
    name: "set-seconds",
    description:
      "Returns a new Date object with the second set. Values outside 0-59 use the native Date overflow behavior.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "second",
        type: "number",
        comment: "0-59",
      },
    ],
  },
  setYear: {
    name: "set-year",
    description:
      "Returns a new Date object with the year set. By default, invalid leap days clamp to the last day of the target month; set <code>dateOverflow</code> to <code>true</code> to allow overflow.",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date | null",
      },
      {
        name: "year",
        type: "number",
      },
      {
        name: "dateOverflow",
        type: "boolean",
        comment: "default: false",
      },
    ],
  },
  tzDate: {
    name: "tz-date",
    description: `Converts an ISO 8601 like string into a Date object with a timezone applied. For example, <code>tzDate('2021-01-01T00:00', 'America/Los_Angeles')</code> will return a Date object representing 2021-01-01 00:00 in L.A.`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "tz",
        type: "string",
        comment: 'IANA timezone, ex: "America/Los_Angeles"',
      },
    ],
    example: "tzDate",
  },
  weekEnd: {
    name: "week-end",
    description: `Returns a new Date object with the date set to the last day of the current week with the time set to 23:59:59 (local).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "startOfWeekDay",
        type: "number",
        comment: "0-6, 0 is Sunday",
      },
    ],
  },
  weekStart: {
    name: "week-start",
    description: `Returns a new Date object with the date set to the first day of the current week with the time set to 00:00:00 (local).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
      {
        name: "startOfWeekDay",
        type: "number",
        comment: "0-6, 0 is Sunday",
      },
    ],
  },
  yearEnd: {
    name: "year-end",
    description:
      "Returns a new Date object with the date set to the end of the year",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  yearStart: {
    name: "year-start",
    description:
      "Returns a new Date object with the date set to the start of the year",
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
}
</script>

<template>
  <PageSection>
    <HeadingSection title="Modify" class="text-sky-500" />
    <p>
      Tempo includes a number of (tree-shakable) utility functions to assist you
      in your date modifying needs. These functions all accept either an ISO
      8601 string or a Date object and return a <em>new Date object</em> (they
      do not change the date argument).
    </p>
    <div v-for="(def, fn) in fns">
      <div class="flex items-center justify-between mb-3">
        <h3 :id="def?.name" class="!m-0">{{ fn }}</h3>
        <GithubLinkAndSize
          :githubLink="
            'https://github.com/formkit/tempo/blob/main/src/' + fn + '.ts'
          "
          :functionSize="(sizes as any)[fn]?.esm?.formattedSize"
        />
      </div>

      <FunctionReference
        :function="fn"
        :arguments="def.arguments"
        :return="def.return"
      />
      <ObjectReference
        v-if="fn === 'add'"
        type="Duration"
        :properties="durationProperties"
      />
      <p v-html="def.description" />
      <CodeExample v-if="def.example" :file="def.example" />
      <CalloutInfo v-if="def.tip">
        <span v-html="def.tip" />
      </CalloutInfo>
    </div>
  </PageSection>
</template>
