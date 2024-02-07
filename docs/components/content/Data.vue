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
  dayOfYear: {},
  formatStr: {},
  fourDigitYear: {},
  monthDays: {},
  nearestDay: {},
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
