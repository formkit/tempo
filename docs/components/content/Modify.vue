<script lang="ts" setup>
import type { FunctionRef } from "../../src/types"
const fns: Record<
  string,
  {
    description: string
    return: string
    arguments: FunctionRef["arguments"]
    example?: string
    tip?: string
  }
> = {
  addDay: {
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
  addMonth: {
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
  dayStart: {
    description: `Returns a new Date object with the time set to 00:00:00.000 (local time).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
    example: "dayStart",
  },
  dayEnd: {
    description: `Returns a new Date object with the time set to 23:59:59 (local).`,
    return: "Date",
    arguments: [
      {
        name: "date",
        type: "string | Date",
      },
    ],
  },
  monthEnd: {
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
  tzDate: {
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
  weekStart: {
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
  weekEnd: {
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
}
</script>

<template>
  <PageSection id="modify">
    <HeadingSection title="Modify" class="text-sky-500" />
    <p>
      Tempo includes a number of (tree-shakable) utility functions to assist you
      in your date modifying needs. These functions all accept either an ISO
      8601 string or a Date object and return a <em>new Date object</em> (they
      do not change the date argument).
    </p>
    <div v-for="(def, fn) in fns">
      <h4>{{ fn }}</h4>
      <FunctionReference
        :function="fn"
        :arguments="def.arguments"
        :return="def.return"
      />
      <p v-html="def.description" />
      <CodeExample v-if="def.example" :file="def.example" />
      <CalloutInfo v-if="def.tip">
        <span v-html="def.tip" />
      </CalloutInfo>
    </div>
  </PageSection>
</template>
