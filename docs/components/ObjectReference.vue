<script lang="ts" setup>
defineProps<{
  type: string
  properties: { name: string; type: string; jsdoc: string[] }[]
}>()
</script>

<template>
  <div
    :class="`
      bg-white
      rounded-lg
      p-3
      font-mono
      text-base
      mb-8
      border
      border-slate-300

      dark:bg-black/20
      dark:border-purple-950
    `"
  >
    <span class="text-blue-700 dark:text-sky-400">interface </span>
    <span class="text-fuchsia-700 dark:text-fuchsia-400">{{ type }} </span>
    {<br /><template v-for="(prop, index) in properties" :key="prop.name">
      <span v-if="prop.jsdoc" class="text-gray-400 dark:text-gray-300">
        <div>&nbsp;&nbsp;/**</div>
        <div v-for="line in prop.jsdoc">&nbsp;&nbsp;&nbsp;* {{ line }}</div>
        <div>&nbsp;&nbsp;&nbsp;*/</div>
      </span>
      <div class="ml-4">
        <span class="text-fuchsia-700 dark:text-fuchsia-400">{{
          prop.name
        }}</span
        >:
        <span class="text-sky-500 dark:text-emerald-400">{{ prop.type }}</span
        >{{ index < properties.length - 1 ? ", " : "" }}
      </div> </template
    >}
  </div>
</template>
