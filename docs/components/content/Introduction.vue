<script setup lang="ts"></script>

<template>
  <PageSection>
    <HeadingSection title="Introduction" class="text-sky-500" />
    <p>
      Tempo is a new library in a proud tradition of JavaScript date and time libraries.
      Tempo is tiny and tree-shakable. You can work with timezones with only a few bytes
      of library code, or perform full international date formatting for ~2Kb (minified
      and brotlied). Each function on this page details it's own impact on your code size.
    </p>
    <p>
      Tempo is best thought of as a collection of utilities for working with the native
      <code>Date</code> object — an important distinction from other libraries that
      provide custom date primitives. Under the hood, Tempo mines JavaScript's
      <code>Intl.DateTimeFormat</code> to extract complex data like timezones offsets and
      locale aware date formats, giving you a simple API to format, parse, and manipulate
      dates.
    </p>

    <CodeExample file="introduction" />
  </PageSection>
</template>
