<template>
  <div class="primary-navigation">
    <div class="input-wrapper flex bg-white">
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="flex-none text-slate-300"
        aria-hidden="true"
      >
        <path d="m19 19-3.5-3.5"></path>
        <circle cx="11" cy="11" r="6"></circle>
      </svg>
      <input type="text" aria-label="Search documentation" class="flex-grow" />
      <kbd class="inline-flex text-slate-300 gap-1 items-center">
        <abbr title="Command" class="text-lg no-underline">⌘</abbr>
        <span class="text-sm">K</span>
      </kbd>
    </div>
  </div>
</template>
