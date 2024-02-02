<script setup lang="ts">
import { defineProps } from "vue"
</script>

<template>
  <PageSection id="introduction">
    <HeadingSection title="Introduction" />
    <p>
      Tempo is a new library in a proud tradition of JavaScript date and time
      libraries. Inspired by the likes of moment.js, day.js, and date-fns Tempo
      is built from the ground up to be as small and easy to use as possible.
    </p>
    <p>
      Under the hood, Tempo mines JavaScript's
      <code>Intl.DateTimeFormat</code> to extract complex data like timezones
      offsets and locale aware date formats giving you a simple API formatting
      and parsing dates.
    </p>
    <CodeExample file="introduction" />
  </PageSection>
</template>
