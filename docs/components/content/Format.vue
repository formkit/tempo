<script setup lang="ts">
import { format } from "@formkit/tempo"
import sizes from "../../assets/func-sizes.json"
</script>

<template>
  <PageSection>
    <div class="flex items-center justify-between mb-8">
      <HeadingSection title="Format" class="text-sky-500 !mb-0" />
      <GithubLinkAndSize
        githubLink="https://github.com/formkit/tempo/blob/main/src/format.ts"
        :functionSize="sizes.format.esm.formattedSize"
      />
    </div>

    <FunctionReference
      function="format"
      :arguments="[
        {
          name: 'date',
          type: 'Date | string',
          comment: 'strings must be ISO 8601',
        },
        { name: 'format', type: 'string | object' },
        { name: 'locale?', type: 'string' },
      ]"
      :overload="[
        {
          name: 'options',
          type: 'FormatOptions',
        },
      ]"
      return="string"
    />
    <p>Tempo’s <code>format()</code> function outputs dates in two ways:</p>
    <ul class="jump-list">
      <li>
        <a href="#format-styles">
          <strong>Format styles</strong> — Knowing how to display dates to an
          international audience is tough. Fortunately
          <code>Intl.DateTimeFormat</code> has a pretty good idea of what the
          user expects based on their locale (or the locale you specify).
        </a>
      </li>
      <li>
        <a href="#format-tokens">
          <strong>Format tokens</strong> — If you already know the format you
          need to display — Tempo’s formatting tokens give you this ability in a
          way you are already familiar with.
        </a>
      </li>
    </ul>
    <CalloutInfo>
      The format function always operates in the local timezone. For example
      <code>2013-01-01T00:00:00Z</code> formatted in the US Eastern timezone
      will be <code>12/31/2012 7:00 PM</code>. Read
      <a href="#timezones">more about timezones</a> for further information.
    </CalloutInfo>
  </PageSection>
  <PageSection>
    <HeadingSection title="Format styles" size="sm" class="text-sky-500" />
    <p>
      When displaying dates to users, it’s a good idea to use the formats they
      are familiar with. Tempo uses <code>Intl.DateTimeFormat</code>’s
      language-sensitive date and time formatting to make this easy. By using a
      date or time "style", you indicate the level of specificity you’d like to
      show the date to the end user with, but no further details. It’s then up
      to the <code>Intl.DateTimeFormat</code> to decide how to most
      appropriately display the date.
    </p>
    <h3 id="date-styles">Date styles</h3>
    <p>
      When using the <code>format()</code> function, the second argument can be
      any of the following date styles, or an object with a date property (ex:
      <code>format(new Date(), { date: 'long' })</code>)
    </p>
    <table>
      <thead>
        <tr>
          <th class="w-1/4">Style</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>full</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{ format(new Date(), "full", "en") }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{ format(new Date(), "full", "de") }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{ format(new Date(), "full", "zh") }}</ClientOnly
            ><br />
          </td>
        </tr>
        <tr>
          <td>
            <code>long</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{ format(new Date(), "long", "en") }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{ format(new Date(), "long", "de") }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{ format(new Date(), "long", "zh") }}</ClientOnly
            ><br />
          </td>
        </tr>
        <tr>
          <td>
            <code>medium</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{ format(new Date(), "medium", "en") }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{ format(new Date(), "medium", "de") }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{ format(new Date(), "medium", "zh") }}</ClientOnly
            ><br />
          </td>
        </tr>
        <tr>
          <td>
            <code>short</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{ format(new Date(), "short", "en") }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{ format(new Date(), "short", "de") }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{ format(new Date(), "short", "zh") }}</ClientOnly
            ><br />
          </td>
        </tr>
      </tbody>
    </table>
    <CodeExample file="format-styles-date" />

    <h3 id="time-styles">Time styles</h3>
    <p>
      To use a time style format you must provide an object as the second
      argument of the <code>format()</code> function with a time property. You
      can also use the time property with the date property.
    </p>
    <table>
      <thead>
        <tr>
          <th class="w-1/4">Style</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>full</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{
              format(new Date(), { time: "full" }, "en")
            }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{
              format(new Date(), { time: "full" }, "de")
            }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{
              format(new Date(), { time: "full" }, "zh")
            }}</ClientOnly
            ><br />
          </td>
        </tr>
        <tr>
          <td>
            <code>long</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{
              format(new Date(), { time: "long" }, "en")
            }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{
              format(new Date(), { time: "long" }, "de")
            }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{
              format(new Date(), { time: "long" }, "zh")
            }}</ClientOnly
            ><br />
          </td>
        </tr>
        <tr>
          <td>
            <code>medium</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{
              format(new Date(), { time: "medium" }, "en")
            }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{
              format(new Date(), { time: "medium" }, "de")
            }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{
              format(new Date(), { time: "medium" }, "zh")
            }}</ClientOnly
            ><br />
          </td>
        </tr>
        <tr>
          <td>
            <code>short</code>
          </td>
          <td>
            <code>en</code>
            <ClientOnly>{{
              format(new Date(), { time: "short" }, "en")
            }}</ClientOnly
            ><br />
            <code>de</code>
            <ClientOnly>{{
              format(new Date(), { time: "short" }, "de")
            }}</ClientOnly
            ><br />
            <code>zh</code>
            <ClientOnly>{{
              format(new Date(), { time: "short" }, "zh")
            }}</ClientOnly
            ><br />
          </td>
        </tr>
      </tbody>
    </table>
    <CodeExample file="format-styles-time" />
  </PageSection>
  <PageSection>
    <HeadingSection title="Format tokens" size="sm" class="text-sky-500" />
    <p>
      If you already know the format you need to display — Tempo’s formatting
      tokens allow for any arbitrary format in a way you are already familiar
      with (tokens are similar to day.js). These tokens automatically leverage
      the user’s locale or the one specified in the format function.
    </p>
    <table>
      <thead>
        <tr>
          <th>Token</th>
          <th>Example</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>YY</code></td>
          <td>{{ format(new Date(), "YY") }}</td>
          <td>2 digit year</td>
        </tr>
        <tr>
          <td><code>YYYY</code></td>
          <td>{{ format(new Date(), "YYYY") }}</td>
          <td>4 digit year</td>
        </tr>
        <tr>
          <td><code>M</code></td>
          <td>{{ format(new Date(), "M") }}</td>
          <td>The month 1-12</td>
        </tr>
        <tr>
          <td><code>MM</code></td>
          <td>{{ format(new Date(), "MM") }}</td>
          <td>The month 01-12</td>
        </tr>
        <tr>
          <td><code>MMM</code></td>
          <td>{{ format(new Date(), "MMM") }}</td>
          <td>Short name Jan-Dec</td>
        </tr>
        <tr>
          <td><code>MMMM</code></td>
          <td>{{ format(new Date(), "MMMM") }}</td>
          <td>Full name January - December</td>
        </tr>
        <tr>
          <td><code>D</code></td>
          <td>{{ format(new Date(), "D") }}</td>
          <td>The day of the month 1-31</td>
        </tr>
        <tr>
          <td><code>DD</code></td>
          <td>{{ format(new Date(), "DD") }}</td>
          <td>The day of the month 01-31</td>
        </tr>
        <tr>
          <td><code>d</code></td>
          <td>{{ format(new Date(), "d") }}</td>
          <td>Single digit day "T"</td>
        </tr>
        <tr>
          <td><code>ddd</code></td>
          <td>{{ format(new Date(), "ddd") }}</td>
          <td>Short day name</td>
        </tr>
        <tr>
          <td><code>dddd</code></td>
          <td>{{ format(new Date(), "dddd") }}</td>
          <td>Full day name Wednesday</td>
        </tr>
        <tr>
          <td><code>H</code></td>
          <td>1, 13</td>
          <td>Minimum hour digits, 24 hour, 0-23</td>
        </tr>
        <tr>
          <td><code>HH</code></td>
          <td>01, 13</td>
          <td>2 hour digits, 24 hour, 00-23</td>
        </tr>
        <tr>
          <td><code>h</code></td>
          <td>1, 12</td>
          <td>Minimum hour digits, 12 hour clock, 1-12</td>
        </tr>
        <tr>
          <td><code>hh</code></td>
          <td>01, 12</td>
          <td>2 hour digits, 12 hour clock, 01-12</td>
        </tr>
        <tr>
          <td><code>m</code></td>
          <td>2, 33</td>
          <td>The minute 0-59</td>
        </tr>
        <tr>
          <td><code>mm</code></td>
          <td>02, 33</td>
          <td>The minute 00-59</td>
        </tr>
        <tr>
          <td><code>s</code></td>
          <td>7, 17</td>
          <td>The second 0-59</td>
        </tr>
        <tr>
          <td><code>ss</code></td>
          <td>07, 17</td>
          <td>The second 00-59</td>
        </tr>
        <tr>
          <td><code>SSS</code></td>
          <td>007, 123, 789</td>
          <td>The millisecond, 3 digits (000-999). When parsing, accepts variable-length fractional seconds (1-9 digits).</td>
        </tr>
        <tr>
          <td><code>a</code></td>
          <td>{{ format(new Date(), "a") }}</td>
          <td>am/pm</td>
        </tr>
        <tr>
          <td><code>A</code></td>
          <td>{{ format(new Date(), "A") }}</td>
          <td>AM/PM</td>
        </tr>
        <tr>
          <td><code>Z</code></td>
          <td>+08:00, +05:30, -05:32:11</td>
          <td>The timezone offset from GMT (<code>[+-]HH:mm[:ss]</code>). Seconds are included for historical timezones with sub-minute offsets.</td>
        </tr>
        <tr>
          <td><code>ZZ</code></td>
          <td>+0800, +0530, -053211</td>
          <td>The timezone offset from GMT (<code>[+-]HHmm[ss]</code>). Seconds are included for historical timezones with sub-minute offsets.</td>
        </tr>
      </tbody>
    </table>
    <CodeExample file="format-tokens" />
    <h3 id="milliseconds">Milliseconds</h3>
    <p>
      The <code>SSS</code> token formats milliseconds as 3 digits (000-999).
      When parsing, it graciously accepts variable-length fractional seconds
      (1-9 digits), making it compatible with high-precision timestamps like
      those from databases or APIs.
    </p>
    <CodeExample file="milliseconds" />
    <h3 id="format-options">Format options</h3>
    <p>
      The <code>format()</code> function can accept an object of options as its
      argument to provide more control over the output.
    </p>
    <ObjectReference
      type="FormatOptions"
      :properties="[
        {
          name: 'date',
          type: 'string | Date',
          jsdoc: ['An ISO 8601 date string or a Date object.'],
        },
        {
          name: 'format',
          type: 'string | { date?: string, time?: string }',
          jsdoc: ['The format can be either format styles or format tokens.'],
        },
        {
          name: 'locale?',
          type: 'string',
          jsdoc: ['The locale to use when formatting.'],
        },
        {
          name: 'tz?',
          type: 'string',
          jsdoc: [
            'Converts the given date option to the timezone provided.',
            'For example, if the provided date option is 2021-01-01T00:00:00Z',
            'and the tz option is America/New_York and the format option is',
            'YYYY-MM-DD HH:mm:ss, the output will be 2020-12-31 19:00:00',
          ],
        },
        {
          name: 'genitive?',
          type: 'boolean',
          jsdoc: [
            'When true, the month and weekday names will be in the',
            'genitive case for locales where it is applicable.',
          ],
        },
        {
          name: 'partFilter?',
          type: '(part: Part) => boolean',
          jsdoc: [
            'A function that filters the parts of the formatted date.',
            'The function is called with each part of the formatted date',
            'and should return true to include the part in the output.',
          ],
        },
      ]"
    />
    <h3 id="format-timezone">Timezone</h3>
    <p>
      The <code>tz</code> option allows you to format the provided date from the
      “perspective” of any given timezone.
    </p>
    <CodeExample file="format-tz" />
    <h3 id="format-part-filter">Part filter</h3>
    <p>
      The <code>partFilter</code> option allows you to filter out
      <a
        href="https://tc39.es/ecma402/#table-datetimeformat-resolvedoptions-properties"
        >parts</a
      >
      of the formatted date. The function is called with each "part" of the
      formatted date and should return a boolean indicating whether or not to
      include that part in final formatted string.
    </p>
    <CodeExample file="format-part-filter" />
    <h3 id="format-genitive">Genitive case</h3>
    <p>
      Some languages have a genitive case for months and weekdays. When the
      genitive option is set to true, the month and weekday names will be in the
      genitive case for locales where it is applicable.
    </p>
    <CodeExample file="format-genitive" />
  </PageSection>
</template>
