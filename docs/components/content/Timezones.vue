<script lang="ts" setup></script>

<template>
  <PageSection>
    <HeadingSection title="Timezones" class="text-sky-500" />
    <p>Timezones are challenging for 2 reasons:</p>
    <ul>
      <li>1. They are conceptually difficult to understand.</li>
      <li>2. They involve a lot of geography, history, and politics.</li>
    </ul>
    <p>
      Tempo provides timezone support via <code>format()</code>,
      <code>tzDate()</code>, <code>offset</code>, <code>applyOffset</code>, and
      <code>removeOffset</code> functions.
    </p>
    <HeadingSection title="Key concept" size="sm" class="text-sky-500" />
    <p>
      A timezone is really an expression or "view" of a given absolute time. An
      airplane departing Amsterdam
      <code>2012-04-07 11:00:00 UTC</code> leaves the ground at the same moment
      in every timezone on earth. JavaScript’s <code>Date</code> object is
      "absolute" in the same way as the airplane’s takeoff. A timezone is only a
      way to express that moment relative the geography and politics of a given
      region.
    </p>
    <HeadingSection title="Using timezones" size="sm" :sidebar-exclude="true" class="text-sky-500" />
    <h3 id="timezones-dates">Creating timezone dates</h3>
    <p>
      The most basic timezone aware function is <code>tzDate</code> which allows
      you to create a new Date object at in a particular timezone.
    </p>
    <CodeExample file="tzDate" />
    <h3 id="timezones-format">Formatting timezones</h3>
    <p>
      The <code>format</code> function can accept a <code>tz</code> option to
      format a date in a specific timezone.
    </p>
    <CodeExample file="tzFormat" />
    <h3 id="timezones-offsets">Calculating offsets</h3>
    <p>
      Tempo uses the <code>Intl.DateTimeFormat</code> API to extract timezone
      information, that makes working with timezones as simple as possible. The
      <code>offset()</code> function calculates the amount of offset between any
      two timezones (given in <code>+-HH:mm</code> or <code>+-HH:mm:ss</code> for
      historical timezones with sub-minute precision).
    </p>
    <CalloutInfo>
      Historical timezones (before standardization) had offsets based on local
      mean time, which could include seconds. For example, America/Detroit in
      1904 had an offset of <code>-05:32:11</code>. Tempo fully supports these
      sub-minute offsets in both formatting and parsing.
    </CalloutInfo>
    <CodeExample file="offset" />
    <h3 id="timezones-remove-offset">Removing offsets</h3>
    <p>
      To display the time of a <code>Date</code> object in a specific timezone
      you only need to remove the relative offset. Since Tempo operates with
      native <code>Date</code> objects the resulting <code>Date</code> object is
      one whose internal methods (like <code>getHours()</code>) will return the
      time "at" the desired timezone.
    </p>
    <CodeExample file="removeOffset" />
    <CalloutWarning>
      Tempo utilizes native <code>Date</code> objects. Since these objects only
      represent an absolute moment in time a date adjusted via the
      <code>offset</code> function is useful for formatting and display purposes
      but actually represents a fundamentally different absolute moment in time.
    </CalloutWarning>
    <h3 id="timezones-apply-offsets">Applying offsets</h3>
    <p>
      If you are creating a car rental booking app you want the pickup time to
      always be relative to the local time of the pickup location. The
      <code>applyOffset</code> function is used to apply a given offset to a
      <code>Date</code> object to determine the absolute time in a different
      timezone.
    </p>
    <CodeExample file="applyOffset" />
  </PageSection>
</template>
