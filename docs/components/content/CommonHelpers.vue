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
}
</script>

<template>
  <PageSection>
    <HeadingSection title="Common Helpers" class="text-sky-500" />
    <p>
      Tempo includes a number of (tree-shakable) helper functions to assist you
      in your date workarounds. These functions all accept either an ISO
      8601 string or a Date object and return a <em>boolean</em>.
    </p>
    <div v-for="(def, fn) in fns">
      <h3 :id="fn">{{ fn }}</h3>
      <FunctionReference :function="fn" :arguments="def.arguments" :return="def.return" />
      <p v-html="def.description" />
      <CodeExample v-if="def.example" :file="def.example" />
      <CalloutInfo v-if="def.tip">
        <span v-html="def.tip" />
      </CalloutInfo>
    </div>
  </PageSection>
</template>
