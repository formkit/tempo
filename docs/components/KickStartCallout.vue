<script setup lang="ts">
const props = defineProps<{ baseDelay: number }>()

const initialShow = ref<undefined | boolean>(undefined)

onMounted(() => {
  setTimeout(() => {
    initialShow.value = true
  }, props.baseDelay * 3.75)
})
</script>

<template>
  <div
    class="group relative mb-5 border border-sky-200/60 dark:border-purple-500/20 bg-gradient-to-tr from-sky-50/80 via-slate-50 to-blue-50/60 dark:from-purple-950/50 dark:via-violet-950/40 dark:to-indigo-950/50 rounded-lg shadow-lg hover:shadow-2xl p-10 flex flex-col md:flex-row items-center gap-10 hover:!-translate-y-2 cursor-pointer duration-600 opacity-0 translate-y-4 data-[show]:opacity-100 data-[show]:translate-y-0 transition-all"
    :data-show="initialShow"
  >
    <a
      class="absolute inset-0 z-10"
      target="_blank"
      href="https://formkit.com?utm_source=tempo&utm_medium=website&utm_campaign=react-callout"
    />

    <span
      class="absolute top-3 right-3 text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:bg-purple-400/10 dark:text-purple-300 border border-sky-500/20 dark:border-purple-400/20"
    >
      New
    </span>

    <div class="callout-icon flex-shrink-0 text-sky-500 dark:text-purple-400 w-16 h-16 md:w-20 md:h-20 opacity-80 group-hover:opacity-100 transition-opacity">
      <svg viewBox="-11.5 -10.232 23 20.463" class="w-full h-full">
        <circle r="2.05" fill="currentColor" />
        <g stroke="currentColor" fill="none" stroke-width="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    </div>
    <div class="callout-content dark:text-white">
      <h3 class="text-xl font-semibold text-slate-800 dark:text-white">
        FormKit for React
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        FormKit is now available for React. The same powerful form-building
        experience — inputs, validation, and themes — now works with your React
        projects.
      </p>

      <span
        class="inline-flex items-center gap-2 border border-sky-300 dark:border-purple-600 px-4 py-2 mt-4 rounded bg-sky-500 dark:bg-purple-600 text-white text-sm font-medium group-hover:bg-sky-600 dark:group-hover:bg-purple-500 transition-colors"
      >
        Learn more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-4 h-4 basis-4"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
  </div>
</template>
