<script lang="ts" setup>
import sizes from "../../assets/func-sizes.json"
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
      <p v-html="def.description" />
      <CodeExample v-if="def.example" :file="def.example" />
      <CalloutInfo v-if="def.tip">
        <span v-html="def.tip" />
      </CalloutInfo>
    </div>
  </PageSection>
</template>
