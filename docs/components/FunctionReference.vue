<script lang="ts" setup>
const props = defineProps<{
  function: string
  arguments: Array<{ name: string; type: string; comment?: string }>
  return: string
}>()
</script>

<template>
  <div class="bg-white rounded-lg p-3 font-mono text-base mb-8">
    <span class="text-blue-700">function </span>
    <span class="text-fuchsia-700">{{ props.function }}</span
    >(<br /><template v-for="(arg, index) in props.arguments" :key="arg.name">
      <div class="ml-4">
        <span class="text-fuchsia-700">{{ arg.name }}</span
        >: <span class="text-sky-500">{{ arg.type }}</span
        >{{ index < props.arguments.length - 1 ? ", " : ""
        }}<span v-if="arg.comment" class="text-gray-400"
          >// {{ arg.comment }}</span
        >
      </div> </template
    >): <span class="text-sky-500">{{ props.return }}</span>
  </div>
</template>
