<script lang="ts" setup>
import type { FunctionRef } from "../src/types"
const props = withDefaults(defineProps<FunctionRef>(), {
  wrapper: true,
})
</script>

<template>
  <div
    :class="
      wrapper
        ? `
      bg-white
      rounded-lg
      p-3
      font-mono
      text-xs
      md:text-sm
      mb-8
      border
      border-slate-300

      dark:text-gray-200
      dark:bg-black/20
      dark:border-purple-950
    `
        : ''
    "
  >
    <span class="text-blue-700 dark:text-sky-400">function </span>
    <span class="text-fuchsia-700 dark:text-fuchsia-400">{{
      props.function
    }}</span
    >(<br /><template v-for="(arg, index) in props.arguments" :key="arg.name">
      <div class="ml-4">
        <span class="text-fuchsia-700 dark:text-fuchsia-400">{{
          arg.name
        }}</span
        >: <span class="text-sky-500 dark:text-emerald-400">{{ arg.type }}</span
        >{{ index < props.arguments.length - 1 ? ", " : ""
        }}<span v-if="arg.comment" class="text-gray-400 dark:text-gray-300"
          >&nbsp;// {{ arg.comment }}</span
        >
      </div> </template
    >):
    <span class="text-sky-500 dark:text-emerald-400">{{ props.return }}</span>
    <div v-if="props.overload" class="text-gray-400 my-4 dark:text-gray-300">
      // or
    </div>
    <FunctionReference
      v-if="props.overload"
      :function="props.function"
      :arguments="props.overload"
      :wrapper="false"
      :return="props.return"
    />
  </div>
</template>
