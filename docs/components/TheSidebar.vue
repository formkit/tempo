<script setup lang="ts">
import { ref, onMounted } from "vue"

const h2s = ref<HTMLElement[]>([])
const h3s = ref<HTMLElement[]>([])
const headingsTree = new Map<HTMLElement, HTMLElement[]>()

onMounted(() => {
  h2s.value =
    (Array.from(
      document.querySelectorAll("h2:not([data-sidebar-exclude=true])")
    ) as HTMLElement[]) || []
  h3s.value =
    (Array.from(
      document.querySelectorAll("h3:not([data-sidebar-exclude=true])")
    ) as HTMLElement[]) || []

  // add ids to all headings based on their text content if id is not already present
  const headings = Array.from(document.querySelectorAll("h2, h3"))
  headings.forEach((heading) => {
    const id = heading?.id ?? heading.textContent?.toLowerCase().replace(/\s/g, "-")
    if (id) {
      heading.id = id
    }
  })

  // create a tree of h2s and h3s
  h2s.value.forEach((h2, i) => {
    if (!h2s.value) return
    const nextH2 = h2s.value[i + 1]
    const h3sUnderH2 = h3s.value.filter((h3) => {
      if (nextH2) {
        return h3.offsetTop > h2.offsetTop && h3.offsetTop < nextH2.offsetTop
      }
      return h3.offsetTop > h2.offsetTop
    })
    headingsTree.set(h2, h3sUnderH2)
  })

  const hash = window.location.hash.slice(1)
  const el = document.getElementById(hash)
  if (el) {
    // TODO: figure out why this delay is necessary
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 800)
  }
})

function openDocSearch() {
  const openButton = document.querySelector("#docsearch button")
  if (openButton instanceof HTMLElement) {
    openButton.click()
  }
}
</script>

<template>
  <aside :class="`
      docs-sidebar
      hidden
      lg:flex
      flex-col
      border-r
      pt-16
      border-r-slate-300
      min-[1400px]:ml-[5%]
      min-[1600px]:ml-auto
      dark:border-r-purple-950
      w-full
      max-w-[200px]
      min-[1400px]:max-w-[250px]
    `">
    <nav :class="`
        docs-sidebar-nav
        sticky
        min-[1400px]:pr-10
        px-2
        pt-0
        top-2
        max-h-[calc(100dvh-0.5rem)]
        overflow-auto
      `">
      <div :class="`
          sticky
          top-0
          z-10

          input-wrapper
          flex
          items-center
          bg-white
          p-2
          pr-3
          rounded-md
          focus-within:outline-sky-500
          focus-within:outline
          focus-within:outline-2
          shadow-md
          mb-4
          cursor-pointer

          dark:bg-purple-900
          dark:focus-within:outline-fuchsia-500
        `" @click="openDocSearch">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" class="text-slate-400 flex-shrink-0 dark:text-purple-300" aria-hidden="true">
          <path d="m19 19-3.5-3.5"></path>
          <circle cx="11" cy="11" r="6"></circle>
        </svg>
        <div type="text" aria-label="Search documentation"
          class="w-full min-w-0 shrink whitespace-nowrap focus:outline-none px-2 text-slate-300 bg-transparent dark:text-purple-400"
          v-text="`Quick search`" ref="search" />
        <kbd class="inline-flex text-slate-400 shrink-0 gap-1 items-center dark:text-purple-300">
          <abbr title="Command" class="text-lg no-underline">⌘</abbr>
          <span class="text-sm">K</span>
        </kbd>
      </div>

      <ul class="pb-5 pl-2 mt-4">
        <li v-for="section in h2s">
          <a :href="`#${section.id}`"
            class="inline-block text-base text-slate-800 hover:text-sky-600 py-1 dark:text-purple-300 dark:hover:text-purple-100">
            {{ section.textContent }}
          </a>

          <ul v-if="headingsTree.get(section)"
            class="relative ml-5 before:w-px before:bg-slate-300 before:absolute before:top-2 before:bottom-2 before:-left-5 dark:before:bg-purple-950">
            <li v-for="subSection in headingsTree.get(section)">
              <a :href="`#${subSection.id}`"
                class="inline-block text-sm text-slate-600 hover:text-sky-600 py-1 dark:text-purple-300/50 dark:hover:text-purple-300">
                {{ subSection.textContent }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
