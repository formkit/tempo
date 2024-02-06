<script lang="ts" setup>
const props = defineProps<{
  type: string
  properties: { name: string; type: string; jsdoc: string[] }[]
}>()
</script>

<template>
  <div class="bg-white rounded-lg p-3 font-mono text-base mb-8">
    <span class="text-blue-700">interface </span>
    <span class="text-fuchsia-700">{{ type }} </span> {<br /><template
      v-for="(prop, index) in properties"
      :key="prop.name"
    >
      <span v-if="prop.jsdoc" class="text-gray-400">
        <div>&nbsp;&nbsp;/**</div>
        <div v-for="line in prop.jsdoc">&nbsp;&nbsp;&nbsp;* {{ line }}</div>
        <div>&nbsp;&nbsp;&nbsp;*/</div>
      </span>
      <div class="ml-4">
        <span class="text-fuchsia-700">{{ prop.name }}</span
        >: <span class="text-sky-500">{{ prop.type }}</span
        >{{ index < properties.length - 1 ? ", " : "" }}
      </div> </template
    >}
  </div>
</template>
