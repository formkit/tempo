<script lang="ts" setup>
import sizes from "../../assets/func-sizes.json"
import type { FunctionRef, ObjectRef } from "../../src/types"

const durationProperties: ObjectRef["properties"] = [
  { name: "years?", type: "number", jsdoc: ["Years in the duration."] },
  { name: "months?", type: "number", jsdoc: ["Months in the duration."] },
  { name: "weeks?", type: "number", jsdoc: ["Weeks in the duration."] },
  { name: "days?", type: "number", jsdoc: ["Days in the duration."] },
  { name: "hours?", type: "number", jsdoc: ["Hours in the duration."] },
  { name: "minutes?", type: "number", jsdoc: ["Minutes in the duration."] },
  { name: "seconds?", type: "number", jsdoc: ["Seconds in the duration."] },
  { name: "milliseconds?", type: "number", jsdoc: ["Milliseconds in the duration."] },
]

const diffOptionsProperties: ObjectRef["properties"] = [
  {
    name: "abs?",
    type: "boolean",
    jsdoc: ["Return absolute values instead of signed values."],
  },
  {
    name: "skip?",
    type: "Array<keyof Duration> | Set<keyof Duration>",
    jsdoc: ["Units to omit while calculating the duration."],
  },
]

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
  diff: {
    description:
      "Returns the difference between two dates as a duration object. The result can be passed to <code>add</code> or formatted with <code>Intl.DurationFormat</code>.",
    return: "Duration",
    arguments: [
      {
        name: "dateA",
        type: "string | Date | null",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "options",
        type: "DiffOptions",
        comment: "abs, skip",
      },
    ],
    example: "diff",
  },
  diffMilliseconds: {
    description:
      "Returns the number of milliseconds difference between two date objects.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
    ],
  },
  diffSeconds: {
    description:
      "Returns the number of seconds difference between two date objects. An optional third argument controls what kind of “rounding” should be used for partial seconds.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "roundingMethod",
        type: '"trunc" | "round" | "floor" | "ceil"',
      },
    ],
  },
  diffMinutes: {
    description:
      "Returns the number of minutes difference between two date objects. An optional third argument controls what kind of “rounding” should be used for partial minutes.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "roundingMethod",
        type: '"trunc" | "round" | "floor" | "ceil"',
      },
    ],
  },
  diffHours: {
    description:
      "Returns the number of hours difference between two date objects. An optional third argument controls what kind of “rounding” should be used for partial hours.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "roundingMethod",
        type: '"trunc" | "round" | "floor" | "ceil"',
      },
    ],
  },
  diffDays: {
    description:
      "Returns the number of days difference between two date objects. An optional third argument controls what kind of “rounding” should be used for partial days.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "roundingMethod",
        type: '"trunc" | "round" | "floor" | "ceil"',
      },
    ],
    example: "diffDays",
  },
  diffWeeks: {
    description:
      "Returns the number of weeks difference between two date objects. An optional third argument controls what kind of “rounding” should be used for partial weeks.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "roundingMethod",
        type: '"trunc" | "round" | "floor" | "ceil"',
      },
    ],
  },
  diffMonths: {
    description:
      "Returns the number of months difference between two date objects. An optional third argument controls what kind of “rounding” should be used for partial months.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "roundingMethod",
        type: '"trunc" | "round" | "floor" | "ceil"',
      },
    ],
  },
  diffYears: {
    description:
      "Returns the number of years difference between two date objects. An optional third argument controls what kind of “rounding” should be used for partial years.",
    return: "number",
    arguments: [
      {
        name: "dateA",
        type: "string | Date",
      },
      {
        name: "dateB",
        type: "string | Date",
      },
      {
        name: "roundingMethod",
        type: '"trunc" | "round" | "floor" | "ceil"',
      },
    ],
  },
  isAfter: {
    description:
      "Returns true if the first date is after the second date, otherwise false.",
    return: "boolean",
    arguments: [
      {
        name: "inputDate",
        type: "string | Date",
      },
      {
        name: "dateToCompare",
        type: "string | Date",
      },
    ],
    example: "isAfter",
  },
  isBefore: {
    description:
      "Returns true if the first date is before the second date, otherwise false.",
    return: "boolean",
    arguments: [
      {
        name: "inputDate",
        type: "string | Date",
      },
      {
        name: "dateToCompare",
        type: "string | Date",
      },
    ],
    example: "isBefore",
  },
  isEqual: {
    description:
      "Returns true if the first date is equal to the second date, otherwise false.",
    return: "boolean",
    arguments: [
      {
        name: "dateLeft",
        type: "string | Date",
      },
      {
        name: "dateRight",
        type: "string | Date",
      },
    ],
    example: "isEqual",
  },
  sameMillisecond: {
    description:
      "Checks if two dates have the same millisecond value (0-999). This compares only the millisecond component, ignoring the rest of the timestamp.",
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
  sameSecond: {
    description:
      "Checks if two dates are the same second. This function is useful for comparing dates but ignoring the milliseconds.",
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
  sameMinute: {
    description:
      "Checks if two dates are the same minute. This function is useful for comparing dates but ignoring the seconds and milliseconds.",
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
  sameHour: {
    description:
      "Checks if two dates are the same hour. This function is useful for comparing dates but ignoring the minutes, seconds, and milliseconds.",
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
  sameYear: {
    description:
      "Checks if two dates are the same year. This function is useful for comparing dates but ignoring the month, day, and time.",
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
}
</script>

<template>
  <PageSection>
    <HeadingSection title="Helpers" class="text-sky-500" />
    <p>
      Tempo includes a number of (tree-shakable) helper functions to assist you
      in your date workarounds. These functions all accept either an ISO 8601
      string or a Date object and return a <em>boolean</em>.
    </p>
    <div v-for="(def, fn) in fns">
      <div class="flex items-center justify-between mb-3">
        <h3 :id="fn" class="!m-0">{{ fn }}</h3>
        <GithubLinkAndSize
          :githubLink="
            'https://github.com/formkit/tempo/blob/main/src/' + fn + '.ts'
          "
          :functionSize="sizes[fn]?.esm?.formattedSize"
        />
      </div>

      <FunctionReference
        :function="fn"
        :arguments="def.arguments"
        :return="def.return"
      />
      <template v-if="fn === 'diff'">
        <ObjectReference type="Duration" :properties="durationProperties" />
        <ObjectReference type="DiffOptions" :properties="diffOptionsProperties" />
      </template>
      <p v-html="def.description" />
      <CodeExample v-if="def.example" :file="def.example" />
      <CalloutInfo v-if="def.tip">
        <span v-html="def.tip" />
      </CalloutInfo>
    </div>
  </PageSection>
</template>
