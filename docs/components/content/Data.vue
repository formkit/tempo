<script lang="ts" setup>
const fns = {
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
  offset: {},
  range: {},
  sameDay: {},
  yearDays: {},
}
</script>

<template>
  <PageSection id="modify">
    <HeadingSection title="Data" class="text-sky-500" />
    <p>
      Tempo also includes functions to extract date information. These functions
      make no changes to the date object and are only used to extract useful
      data that is commonly needed to build applications.
    </p>
    <div v-for="(def, fn) in fns">
      <h4>{{ fn }}</h4>
      <p v-html="def.description" />
      <FunctionReference
        :function="fn"
        :arguments="def.arguments"
        :return="def.return"
      />
    </div>
  </PageSection>
</template>
