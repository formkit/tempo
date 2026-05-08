<script lang="ts" setup>
import sizes from "../../assets/func-sizes.json"
import type { FunctionRef, ObjectRef } from "../../src/types"

const fns: Record<
  string,
  {
    name: string
    description: string
    return: string
    arguments: FunctionRef["arguments"]
    objectReference?: ObjectRef
    example?: string
    tip?: string
  }
> = {
  ap: {
    name: "ap",
    description: "Returns either am or pm but in any given locale.",
    return: "string",
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
    name: "day-of-year",
    description: `Gets the day of the year a given date is. For example, August 1st is the 213th day of the year on non-leap years and 214th on leap years.`,
    arguments: [
      {
        name: "date",
        type: "Date",
      },
    ],
    return: "number",
  },
  formatStr: {
    name: "format-str",
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
    example: "format-str",
  },
  fourDigitYear: {
    name: "four-digit-year",
    description:
      "Converts a 2 digit year into a 4 digit year. This function assumes years 20 years into the future belong to the current century, and the past 80 are in the past century.",
    arguments: [
      {
        name: "year",
        type: "string",
      },
    ],
    return: "number",
  },
  iso8601: {
    name: "iso-8601",
    description:
      "Validates that a given date passes “acceptable” levels of ISO 8601 compatibility and can be utilized within Tempo. This allows incomplete dates but must include at least the year and month. Does not require the <code>T</code> separator.",
    arguments: [
      {
        name: "date",
        type: "Date",
      },
    ],
    return: "boolean",
  },
  monthDays: {
    name: "month-days",
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
    name: "nearest-day",
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
    name: "offset",
    description:
      "Returns the offset between two (IANA) timezones on a given date. The results are ISO 8601 compatible string offsets like -0800 or +0530.",
    arguments: [
      {
        name: "date",
        type: "Date",
      },
      {
        name: "tzA?",
        type: "string",
        comment: "default: UTC, ex: America/New_York",
      },
      {
        name: "tzB?",
        type: "string",
        comment: "default: browser, ex: Europe/Paris",
      },
    ],
    return: "string",
  },
  parseParts: {
    name: "parse-parts",
    description:
      'Given a date string like "2019/12/31" and the parts (like those returned from the <a href="#parts"><code>parts</code> function</a>) this function returns the parts with the appropriate values extracted from the date string and added to a <code>value</code> property.',
    arguments: [
      {
        name: "dateString",
        type: "string",
      },
      {
        name: "parts",
        type: "Part[]",
      },
    ],
    objectReference: {
      type: "FilledPart extends Part",
      properties: [
        {
          name: "value",
          type: "string",
          jsdoc: ["The value of the part extracted from the date string."],
        },
      ],
    },
    return: "FilledPart[]",
    example: "parseParts",
  },
  parts: {
    name: "parts",
    description:
      'Given a format and locale, this function produces an array of "parts". Similar to <code>Intl.DateTimeFormat.formatToParts()</code> but it accepts style formats and token formats and returns parts with granular data such as the part’s token and a regex to match for it.',
    arguments: [
      {
        name: "format",
        type: "string",
      },
      {
        name: "locale",
        type: "string",
      },
    ],
    example: "parts",
    objectReference: {
      type: "Part",
      properties: [
        {
          name: "hour12",
          type: "boolean",
          jsdoc: ["Does this part require a 12 hour clock?"],
        },
        {
          name: "option",
          type: "Partial<Record<Intl.DateTimeFormatPartTypes, string>>",
          jsdoc: [
            "An object of partName to partValue For example:",
            "{ hour: '2-digit' }",
          ],
        },
        {
          name: "partName",
          type: "Intl.DateTimeFormatPartTypes",
          jsdoc: ["The type of part. For example: month or timeZoneName."],
        },
        {
          name: "partValue",
          type: "string",
          jsdoc: [
            'The value of a given part. For example "2-digit", or "narrow".',
          ],
        },
        {
          name: "pattern",
          type: "RegExp",
          jsdoc: ["A regular expression for matching the above token."],
        },
        {
          name: "token",
          type: "string",
          jsdoc: [
            "The Tempo token for this part. For example: <code>MMMM</code>.",
          ],
        },
      ],
    },
    return: "Part[]",
  },
  range: {
    name: "range",
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
        comment: 'default: "en"',
      },
      {
        name: "genitive?",
        type: "boolean",
        comment: "default: false",
      },
    ],
    return: "string[]",
    example: "range",
  },
  yearDays: {
    name: "year-days",
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
      <div class="flex items-center justify-between mb-3">
        <h3 :id="def?.name" class="!m-0">{{ fn }}</h3>
        <GithubLinkAndSize
          :githubLink="'https://github.com/formkit/tempo/blob/main/src/' + fn + '.ts'"
          :functionSize="sizes[fn]?.esm?.formattedSize"
        />
      </div>

      <FunctionReference :function="fn" :arguments="def.arguments" :return="def.return" />
      <p v-html="def.description" />
      <CodeExample v-if="def.example" :file="def.example" />
      <CalloutInfo v-if="def.tip" v-html="def.tip" />
      <ObjectReference v-if="def.objectReference" :type="def.objectReference.type"
        :properties="def.objectReference.properties" />
    </div>
  </PageSection>
</template>
