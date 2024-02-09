<script setup lang="ts">
import { defineProps } from "vue"
import { format } from "@formkit/tempo"
</script>

<template>
  <PageSection id="format">
    <HeadingSection title="Format" class="text-sky-500" />
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
        { name: 'genitive?', type: 'boolean' },
      ]"
      return="string"
    />
    <p>Tempo’s <code>format()</code> function output’s dates in two ways:</p>
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
  <PageSection id="format-styles">
    <HeadingSection title="Format styles" size="sm" class="text-sky-500" />
    <p>
      When displaying a dates to users it’s a good idea to use the formats they
      are familiar with. Tempo uses <code>Intl.DateTimeFormat</code>’s language
      sensitive date and time formatting to make this easy. By using a date or
      time "style" you indicate the level of specificity you’d like to show the
      date to the end user with, but no further details. It’s then up to the
      <code>Intl.DateTimeFormat</code> to decide how to most appropriately
      display the date.
    </p>
    <h4>Date styles</h4>
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
            <code>en</code> {{ format(new Date(), "full", "en") }}<br />
            <code>de</code> {{ format(new Date(), "full", "de") }}<br />
            <code>zh</code> {{ format(new Date(), "full", "zh") }}<br />
          </td>
        </tr>
        <tr>
          <td>
            <code>long</code>
          </td>
          <td>
            <code>en</code> {{ format(new Date(), "long", "en") }}<br />
            <code>de</code> {{ format(new Date(), "long", "de") }}<br />
            <code>zh</code> {{ format(new Date(), "long", "zh") }}<br />
          </td>
        </tr>
        <tr>
          <td>
            <code>medium</code>
          </td>
          <td>
            <code>en</code> {{ format(new Date(), "medium", "en") }}<br />
            <code>de</code> {{ format(new Date(), "medium", "de") }}<br />
            <code>zh</code> {{ format(new Date(), "medium", "zh") }}<br />
          </td>
        </tr>
        <tr>
          <td>
            <code>short</code>
          </td>
          <td>
            <code>en</code> {{ format(new Date(), "short", "en") }}<br />
            <code>de</code> {{ format(new Date(), "short", "de") }}<br />
            <code>zh</code> {{ format(new Date(), "short", "zh") }}<br />
          </td>
        </tr>
      </tbody>
    </table>
    <CodeExample file="format-styles-date" />

    <h4>Time styles</h4>
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
            <code>en</code> {{ format(new Date(), { time: "full" }, "en")
            }}<br />
            <code>de</code> {{ format(new Date(), { time: "full" }, "de")
            }}<br />
            <code>zh</code> {{ format(new Date(), { time: "full" }, "zh")
            }}<br />
          </td>
        </tr>
        <tr>
          <td>
            <code>long</code>
          </td>
          <td>
            <code>en</code> {{ format(new Date(), { time: "long" }, "en")
            }}<br />
            <code>de</code> {{ format(new Date(), { time: "long" }, "de")
            }}<br />
            <code>zh</code> {{ format(new Date(), { time: "long" }, "zh")
            }}<br />
          </td>
        </tr>
        <tr>
          <td>
            <code>medium</code>
          </td>
          <td>
            <code>en</code> {{ format(new Date(), { time: "medium" }, "en")
            }}<br />
            <code>de</code> {{ format(new Date(), { time: "medium" }, "de")
            }}<br />
            <code>zh</code> {{ format(new Date(), { time: "medium" }, "zh")
            }}<br />
          </td>
        </tr>
        <tr>
          <td>
            <code>short</code>
          </td>
          <td>
            <code>en</code> {{ format(new Date(), { time: "short" }, "en")
            }}<br />
            <code>de</code> {{ format(new Date(), { time: "short" }, "de")
            }}<br />
            <code>zh</code> {{ format(new Date(), { time: "short" }, "zh")
            }}<br />
          </td>
        </tr>
      </tbody>
    </table>
    <CodeExample file="format-styles-time" />
  </PageSection>
  <PageSection id="format-tokens">
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
          <td>+0800, +0530, -1345</td>
          <td>The timezone offset from GMT</td>
        </tr>
      </tbody>
    </table>
    <CodeExample file="format-tokens" />
    <p>
      The <code>format()</code> function accepts a fourth argument, a boolean
      indicating whether or not genitive cases should be used. This is useful
      for languages that have different forms of the month and day names when
      used in a context that requires the genitive case.
    </p>
    <CodeExample file="format-genitive" />
  </PageSection>
</template>
