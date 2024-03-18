<script setup lang="ts"></script>

<template>
  <PageSection>
    <HeadingSection title="Introduction" class="text-sky-500" />
    <p>
      Tempo is a new library in a proud tradition of JavaScript date and time
      libraries. Inspired by the likes of moment.js, day.js, and date-fns, Tempo
      is built from the ground up to be as small and easy to use as possible
      (all features ~5kB compressed) — including first-class support for
      timezone operations.
    </p>
    <p>
      Tempo is best thought of as a collection of utilities for working with the
      native <code>Date</code> object — an important distinction from other
      libraries that provide custom date primitives. Under the hood, Tempo mines
      JavaScript's <code>Intl.DateTimeFormat</code> to extract complex data like
      timezones offsets and locale aware date formats, giving you a simple API
      to format, parse, and manipulate dates.
    </p>

    <CodeExample file="introduction" />
  </PageSection>
</template>
