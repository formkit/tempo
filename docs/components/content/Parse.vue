<script setup lang="ts">
const parseOptionsProperties = [
  { name: "date", type: "string", jsdoc: [`A string representing a date.`] },
  {
    name: "format",
    type: "Format",
    jsdoc: [
      "The format that should be used to parse the date.",
      "This is a string composed of tokens.",
    ],
  },
  {
    name: "locale",
    type: "string",
    jsdoc: [`The locale used to parse the date.`],
  },
  {
    name: "partFilter?",
    type: "(part: Part) => boolean",
    jsdoc: [
      "A function that can be used to filter out",
      "parts of the format. This is useful when using the format styles",
      "like { date: 'full', time: 'full' } and not wanting to keep",
      "all the parts of the given format.",
    ],
  },
  {
    name: "dateOverflow?",
    type: '"forward" | "backward" | "throw"',
    jsdoc: [
      "The behavior to use when a date overflows a given month.",
      "For example, if the date to parse is February 29, 2023 — there is",
      'no 29th day of February. In this case overflow "forward" would',
      'result in March 1, 2023, "backward" would result in',
      'February 28, 2023 and "throw" would throw an error.',
    ],
  },
]
</script>

<template>
  <PageSection>
    <HeadingSection title="Parse" class="text-sky-500" />
    <FunctionReference
      function="parse"
      :arguments="[
        {
          name: 'date',
          type: 'string',
        },
        { name: 'format', type: 'string | { date?: string, time?: string }' },
        { name: 'locale?', type: 'string' },
      ]"
      :overload="[{ name: 'options', type: 'ParseOptions' }]"
      return="Date"
    />
    <p>
      To convert a date string into a <code>Date</code> object we use the
      <code>parse</code> function. This allows us to parse any output from the
      <code>format</code> function — including style formats!
    </p>
    <p>
      A <code>Date</code> object in JavaScript is fundamentally a timestamp, in
      other words, always includes both date and time. The
      <code>parse</code> function does not need to include both date and time,
      but the resulting <code>Date</code> object will always include both. For
      consistent behavior, the undefined portions of the full date will use the
      current date at midnight local time.
    </p>
    <CalloutInfo>
      Because formatting tokens are sensitive to the locale, you will generally
      want to include the <code>locale</code> option when parsing a date string
      that not a standardized format (like ISO 8601)
    </CalloutInfo>
    <CodeExample file="parse-basic" />
    <h3 id="parse-options">Parsing options</h3>
    <p>
      The <code>parse</code> function can accept an object of options as its
      argument:
    </p>
    <ObjectReference type="ParseOptions" :properties="parseOptionsProperties" />
    <p>
      The <code>date</code>, <code>format</code>, <code>locale</code> options
      are familiar, but what is <code>partFilter</code> and
      <code>dataOverflow</code>?
    </p>
    <h3 id="parse-part-filter">partFilter</h3>
    <p>
      The <code>partFilter</code> option gives you fine-grained control over
      which pieces and <a href="https://tc39.es/ecma402/#table-datetimeformat-resolvedoptions-properties">parts</a>
      of a date you’d like to include in the resulting <code>Date</code> object
      (remember, missing "parts" will default to the today’s date at midnight
      local).
    </p>
    <CodeExample file="part-filter" />
    <h3 id="dateOverflow">dateOverflow</h3>
    <p>
      The <code>dateOverflow</code> option determines how an “out of range” date
      should be parsed (ex: February 30th). Options are
      <code>backward</code> (default), <code>forward</code>, <code>throw</code>.
    </p>
    <CodeExample file="date-overflow" />
    <CodeExample file="date-overflow-throw" />
  </PageSection>
</template>
