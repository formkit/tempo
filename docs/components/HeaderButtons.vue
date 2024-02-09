<script lang="ts" setup>
const showButtons = ref<undefined | boolean>(undefined)
const didCopy = useTimedRef(4000)
const code = ref<HTMLElement>()
const packageManager = ref<string>("npm i")
const packageManagers = ["npm install", "yarn add", "pnpm add", "bun install"]

onMounted(() => {
  setTimeout(() => {
    showButtons.value = true
  }, 2000)
  setInterval(() => {
    packageManager.value =
      packageManagers[
        (packageManagers.indexOf(packageManager.value) + 1) %
          packageManagers.length
      ]
  }, 3500)
})

function copyCode() {
  navigator.clipboard.writeText(`${packageManager.value} @formkit/tempo`)
  didCopy.value = true
}
</script>

<template>
  <div
    :data-show="showButtons"
    class="flex flex-col justify-center items-center gap-4 sm:flex-row sm:gap-8 opacity-0 translate-y-4 transition-all duration-700 data-[show]:opacity-100 data-[show]:translate-y-0"
  >
    <a
      class="bg-black py-3 px-6 text-white rounded-lg flex items-center text-sm"
      href="https://github.com/formkit/tempo"
    >
      <svg viewBox="0 0 16 16" class="w-4 fill-[#EAC54F] mr-2">
        <path
          d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
        ></path>
      </svg>
      Star on GitHub
    </a>
    <a
      href="#copy-code"
      @click.prevent="copyCode"
      ref="code"
      class="group relative font-mono text-sm text-fuchsia-700 shadow-lg py-3 px-6 bg-white rounded-lg flex items-center"
    >
      <span
        v-if="!didCopy"
        v-text="packageManager"
        :key="packageManager"
        class="whitespace-nowrap"
      />
      <span class="ml-2 mr-4" v-if="!didCopy">@formkit/tempo</span>
      <IconCopy
        v-if="!didCopy"
        class="w-3 basis-3 flex-shrink-0 text-gray-400 group-hover:text-fuchsia-700"
      />
      <span
        v-if="didCopy"
        :key="packageManager"
        class="whitespace-nowrap text-green-700 flex items-center gap-2"
      >
        Command copied!
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </span>
    </a>
  </div>
</template>

<style></style>
