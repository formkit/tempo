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
  </PageSection>
</template>
