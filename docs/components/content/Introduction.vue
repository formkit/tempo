<script setup lang="ts">
import { defineProps } from "vue"
</script>

<template>
  <PageSection id="introduction">
    <HeadingSection title="Introduction" class="text-sky-500" />
    <p>
      Tempo is a new library in a proud tradition of JavaScript date and time
      libraries. Inspired by the likes of moment.js, day.js, and date-fns Tempo
      is built from the ground up to be as small and easy to use as possible.
    </p>
    <p>
      Under the hood, Tempo mines JavaScript's
      <code>Intl.DateTimeFormat</code> to extract complex data like timezones
      offsets and locale aware date formats giving you a simple API to format,
      parse, and manipulates dates.
    </p>
    <CodeExample file="introduction" />
  </PageSection>
</template>
