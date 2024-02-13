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
  ap: {
    description: "Returns either am or pm but in any given locale.",
    return: "Date",
    arguments: [
      {
        name: "amOrPm",
        type: "'am' | 'pm'",
      },
      {
        name: "locale",
        type: "string",
      },
    ],
    example: "ap",
  },
  dayOfYear: {
    description: `Gets the what day of the year a given date is. For example, August 1st is the 213th day of the year on non-leapyears and 214th on leapyears.`,
    arguments: [
      {
        name: "date",
        type: "Date",
      },
    ],
    return: "number",
  },
  formatStr: {
    description:
      "This little gem of a function returns the token format for a given format style.",
    arguments: [
      {
        name: "format",
        type: "{ date?: string, time?: string }",
      },
      {
        name: "locale?",
        type: "string",
      },
    ],
    return: "string",
  },
  fourDigitYear: {
    description:
      "Converts a 2 digit year into a 4 digit year. This function assumes years 20 years into the future belong to the current century, and the past 80 are in the past.",
    arguments: [
      {
        name: "year",
        type: "string",
      },
    ],
    return: "number",
  },
  iso8601: {
    description:
      "Validates that a given date passes “acceptable” levels of ISO 8601 compatibility and can be utilized within Tempo. This allows incomplete dates but must include at least the year and month. Does not require the <code>T</code> separator.",
    arguments: [
      {
        name: "date",
        type: "Date",
      },
    ],
    return: "string",
  },
  monthDays: {
    description: "Returns the number of days in a given month.",
    arguments: [
      {
        name: "date",
        type: "Date",
      },
    ],
    return: "number",
  },
  nearestDay: {
    description:
      "Performs a bidirectional search for the nearest date that passes a given search function. It stops searching when it finds a result or when it reaches the constraint bounds (on both sides).",
    arguments: [
      {
        name: "date",
        type: "Date",
      },
      {
        name: "searchFunction",
        type: "(date: Date) => boolean",
      },
      {
        name: "constraint",
        type: 'number | "month" | "week" | "year" = 7',
      },
    ],
    return: "Date | null",
  },
  offset: {
    description:
      "Returns the offset between two (IANA) timezones on a given date. The results are ISO8601 compatible string offsets like -0800 or +0530.",
    arguments: [
      {
        name: "date",
        type: "Date",
      },
      {
        name: "tzA?",
        type: "string",
        comment: "// default: UTC, ex: America/New_York",
      },
      {
        name: "tzB?",
        type: "string",
        comment: "// default: browser, ex: Europe/Paris",
      },
    ],
    return: "string",
  },
  range: {
    description:
      "Returns an array of options for a given token in a given locale. For example, the token <code>MMMM</code> in the locale <code>en-US</code> would return <code>['January', 'February', 'March', ...]</code>.",
    arguments: [
      {
        name: "token",
        type: "string",
      },
      {
        name: "locale",
        type: "string",
        comment: '// default: "en"',
      },
      {
        name: "genitive?",
        type: "boolean",
        comment: "// default: false",
      },
    ],
    return: "string[]",
    example: "range",
  },
  sameDay: {
    description:
      "Checks if two dates are the same day. This function is useful for comparing dates but ignoring the time.",
    arguments: [
      {
        name: "dateA",
        type: "Date",
      },
      {
        name: "dateB",
        type: "Date",
      },
    ],
    return: "boolean",
  },
  yearDays: {
    description:
      "Returns the number of days in a given year. Leap years and century years cause this to not always be 365.",
    arguments: [
      {
        name: "date",
        type: "Date",
      },
    ],
    return: "number",
  },
}
</script>

<template>
  <PageSection>
    <HeadingSection title="Data" class="text-sky-500" />
    <p>
      Tempo also includes functions to extract date information. These functions
      make no changes to the date object and are only used to extract useful
      data that is commonly needed to build applications.
    </p>
    <div v-for="(def, fn) in fns">
      <h3 :id="fn">{{ fn }}</h3>
      <FunctionReference
        :function="fn"
        :arguments="def.arguments"
        :return="def.return"
      />
      <p v-html="def.description" />
      <CodeExample v-if="def.example" :file="def.example" />
      <CalloutInfo v-if="def.tip" v-html="def.tip" />
    </div>
  </PageSection>
</template>
