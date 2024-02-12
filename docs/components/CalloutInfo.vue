<template>
  <aside
    class="bg-sky-200 p-4 rounded-lg text-slate-800 leading-8 mb-8 dark:bg-sky-800 dark:text-sky-50 dark:[&_code]:!border-0 dark:[&_code]:!text-sky-400"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6 inline-block mr-1 relative -top-[0.1em]"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      />
    </svg>
    <slot />
  </aside>
</template>
