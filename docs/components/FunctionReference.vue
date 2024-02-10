<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    function: string
    arguments: Array<{ name: string; type: string; comment?: string }>
    overload?: Array<{ name: string; type: string; comment?: string }>
    return: string
    wrapper?: boolean
  }>(),
  {
    wrapper: true,
  }
)
</script>

<template>
  <div
    :class="wrapper ? 'bg-white rounded-lg p-3 font-mono text-base mb-8' : ''"
  >
    <span class="text-blue-700">function </span>
    <span class="text-fuchsia-700">{{ props.function }}</span
    >(<br /><template v-for="(arg, index) in props.arguments" :key="arg.name">
      <div class="ml-4">
        <span class="text-fuchsia-700">{{ arg.name }}</span
        >: <span class="text-sky-500">{{ arg.type }}</span
        >{{ index < props.arguments.length - 1 ? ", " : ""
        }}<span v-if="arg.comment" class="text-gray-400"
          >&nbsp;// {{ arg.comment }}</span
        >
      </div> </template
    >): <span class="text-sky-500">{{ props.return }}</span>
    <div v-if="props.overload" class="text-gray-400 my-4">// or</div>
    <FunctionReference
      v-if="props.overload"
      :function="props.function"
      :arguments="props.overload"
      :wrapper="false"
      :return="props.return"
    />
  </div>
</template>
