<script lang="ts" setup>
const code = ref()
const success = useTimedRef(3000)
function copyCode() {
  navigator.clipboard.writeText(code.value.textContent.trim())
  success.value = true
}
</script>

<template>
  <div>
    <div
      ref="code"
      :class="`
        group
        cursor-pointer
        relative
        font-mono
        text-sm
        border
        border-slate-300
        text-fuchsia-700
        data-[success]:text-green-600
        py-3
        px-6
        bg-white
        rounded-lg
        flex
        items-center

        dark:bg-purple-950/50
        dark:border-purple-900
        dark:text-fuchsia-400
        dark:data-[success]:text-green-400
      `"
      :data-success="success || null"
      @click.prevent="copyCode"
    >
      <span v-if="!success" class="flex flex-grow items-center justify-between">
        <slot />
        <IconCopy
          class="w-3 text-slate-400 group-hover:text-fuchsia-700 dark:group-hover:text-sky-400"
        />
      </span>
      <span v-else class="flex items-center w-full gap-2">
        Install command copied!
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 ml-auto"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<style></style>
