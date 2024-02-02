<script setup lang="ts">
import { defineProps } from "vue"
</script>

<template>
  <PageSection id="introduction">
    <HeadingSection title="Introduction" />
    <p>
      Tempo is a new library in a proud tradition of JavaScript date and time
      libraries that make working with dates and times easier. Tempo is inspired
      by libraries like moment.js, day.js, and date-fns but it is built from the
      ground up to be as small and easy to use as possible.
    </p>
    <p>
      Under the hood, Tempo leverages JavaScript's
      <code>Intl.DateTimeFormat</code> to extract complex time information like
      timezones and locale aware date formats, and then gives you a simple API
      formatting and parsing dates.
    </p>
    <CodeExample file="introduction" />
  </PageSection>
</template>
