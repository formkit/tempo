<script setup lang="ts"></script>

<template>
  <PageSection id="parse">
    <HeadingSection title="Parse" class="text-sky-500" />
    <FunctionReference
      function="parse"
      :arguments="[
        {
          name: 'date',
          type: 'string | ParseOptions',
        },
        { name: 'format', type: 'string | { date?: string, time?: string }' },
        { name: 'locale?', type: 'string' },
      ]"
      return="Date"
    />
    <p>
      To convert a date string into a <code>Date</code> object we use the
      <code>parse</code> function. This allows us to parse any output from the
      <code>format</code> function — including locale time styles!
    </p>
    <p>
      A <code>Date</code> object in JavaScript is always includes both date and
      time. The <code>parse</code> function does not need to include both date
      and time, but the resulting <code>Date</code> object will always include
      both. For consistent behavior, the undefined portions of the full date
      will use the current date at midnight local time.
    </p>
    <CalloutInfo>
      Because date tokens are sensitive to the locale, you will generally want
      to include the <code>locale</code> option when parsing a date string that
      not a standardized format (like ISO 8601)
    </CalloutInfo>
    <CodeExample file="parse-basic" />
  </PageSection>
</template>
