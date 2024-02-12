<script setup lang="ts">
const search = ref<HTMLInputElement | null>(null)

const results = ref<Array<{ title: string; description: string; id: string }>>([
  {
    title: "Install",
    description: "Learn how to get started with Tempo.",
    id: "#install",
  },
  {
    title: "Format",
    description:
      "Learn to format dates by locale shorthand or a custom tokens.",
    id: "#format",
  },
  {
    title: "Parse",
    description: "Learn to parse a date from any format.",
    id: "#parse",
  },
  {
    title: "Modify",
    description: "Learn to manipulate and change dates.",
    id: "#modify",
  },
  {
    title: "Timezones",
    description: "Learn to manipulate and change dates.",
    id: "#timezones",
  },
])
const initialShow = ref<undefined | boolean>(undefined)

onMounted(() => {
  search.value?.focus()
  document.addEventListener("keydown", (event) => {
    if (event.metaKey && event.key === "k") {
      event.preventDefault()
      search.value?.focus()
    }
  })

  setTimeout(() => {
    initialShow.value = true
  }, 2200)
})
</script>

<template>
  <div
    class="search mb-10 max-w-4xl mx-auto duration-600 opacity-0 translate-y-4 data-[show]:opacity-100 data-[show]:translate-y-0 transition-all"
    :data-show="initialShow"
  >
    <div class="search-tray">
      <div
        :class="`
          input-wrapper
          flex
          bg-white
          p-2
          pr-3
          rounded-md
          focus-within:outline-sky-500
          focus-within:outline
          focus-within:outline-2
          shadow-md
          mb-4

          dark:bg-purple-900
          dark:focus-within:outline-fuchsia-500
        `"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-slate-400 relative top-0.5 dark:text-purple-300"
          aria-hidden="true"
        >
          <path d="m19 19-3.5-3.5"></path>
          <circle cx="11" cy="11" r="6"></circle>
        </svg>
        <input
          type="text"
          aria-label="Search documentation"
          class="flex-grow focus:outline-none px-2 placeholder:text-slate-300 bg-transparent dark:placeholder:text-purple-400 dark:text-gray-300"
          placeholder="Quick search..."
          ref="search"
        />
        <kbd
          class="inline-flex text-slate-400 gap-1 items-center dark:text-purple-300"
        >
          <abbr title="Command" class="text-lg no-underline">⌘</abbr>
          <span class="text-sm">K</span>
        </kbd>
      </div>
      <div class="search-results">
        <ul v-if="results.length">
          <li v-for="result in results" class="mb-2">
            <a
              :href="result.id"
              tabindex="0"
              :class="`
                group
                px-4
                py-3
                bg-white
                shadow-sm
                rounded-lg
                flex
                justify-between
                items-center
                focus:outline
                focus:outline-sky-500
                focus:outline-2
                transition-shadow
                hover:shadow-md

                dark:bg-purple-950
                dark:focus:outline-fuchsia-500
                dark:border
                dark:border-purple-900
              `"
            >
              <div class="pr-4">
                <div class="font-bold dark:text-purple-100">
                  {{ result.title }}
                </div>
                <p class="text-sm text-slate-600 dark:text-purple-300">
                  {{ result.description }}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="w-6 h-6 basis-6 group-focus:fill-sky-500 flex-shrink-0 dark:fill-fuchsia-200 dark:group-focus:fill-fuchsia-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
