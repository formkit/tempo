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
    class="relative mb-5 border border-slate-300/60 dark:border-blue-600/20 bg-gradient-to-tr from-blue-100/60 to-fuchsia-100/90 dark:from-blue-800/40 dark:to-fuchsia-700/40 rounded-lg shadow-lg hover:shadow-2xl p-10 flex flex-col md:flex-row items-center gap-10 hover:!-translate-y-2 cursor-pointer duration-600 opacity-0 translate-y-4 data-[show]:opacity-100 data-[show]:translate-y-0 transition-all"
    :data-show="initialShow"
  >
    <a
      class="absolute inset-0 z-10"
      target="_blank"
      href="https://kickstart.formkit.com"
    />

    <span
      class="announcement-icon absolute top-2 right-2 w-10 p-3 bg-white dark:bg-white/80 aspect-square rounded-full"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path
          fill="currentColor"
          d="M544 32c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64c0-17.7 14.3-32 32-32zM64 190.3L480 64V448L348.9 408.2C338.2 449.5 300.7 480 256 480c-53 0-96-43-96-96c0-11 1.9-21.7 5.3-31.5L64 321.7C63.1 338.6 49.1 352 32 352c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32c17.1 0 31.1 13.4 32 30.3zm239 203.9l-91.6-27.8c-2.1 5.4-3.3 11.4-3.3 17.6c0 26.5 21.5 48 48 48c23 0 42.2-16.2 46.9-37.8z"
        />
      </svg>
    </span>

    <div class="callout-image max-w-[200px]">
      <svg
        id="b"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        class="w-full block dark:invert"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 562.4 100.3"
      >
        <defs>
          <linearGradient
            id="d"
            x1="3.1"
            y1="-330.7"
            x2="67.8"
            y2="-430.7"
            gradientTransform="translate(0 -319.9) scale(1 -1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#f79259" />
            <stop offset="1" stop-color="#f8ce68" />
          </linearGradient>
        </defs>
        <g id="c" data-name="Layer 2">
          <path
            class="e"
            d="m16.7,0H0v16.7h16.7V0Zm0,66.7H0v16.7h16.7v-16.7Zm33.4,16.7h50v16.7h-50v-16.7ZM33.4,16.7h-16.7v16.7h16.7v16.7h16.7v-16.7h-16.7v-16.7Zm-16.7,33.3h16.7v16.7h-16.7v-16.7Z"
          />
          <g>
            <path
              class="f"
              d="m131.3,100h-11.2v-17.6h11.2v2.4h-8.4v5.2h8v2.3h-8v5.5h8.4v2.4Z"
            />
            <path
              class="f"
              d="m149.8,95.3h-6.7l-1.6,4.8h-2.8l6.4-17.6h3l6.4,17.6h-2.9l-1.6-4.8Zm-6-2.2h5.3l-2.6-7.7h0l-2.6,7.7Z"
            />
            <path
              class="f"
              d="m164.9,100h-2.7v-17.6h6.9c3.6,0,5.9,2.1,5.9,5.4s-1.3,4.3-3.4,5l4,7.2h-3.2l-3.6-6.8h-3.9v6.8Zm0-9h3.9c2.1,0,3.3-1.2,3.3-3.2s-1.3-3.2-3.4-3.2h-3.9v6.3Z"
            />
            <path class="f" d="m194.4,100h-10.9v-17.6h2.7v15.2h8.2v2.4Z" />
            <path
              class="f"
              d="m205,100v-7.2l-6.2-10.4h3.1l4.5,7.8h0l4.5-7.8h3l-6.2,10.4v7.2h-2.7Z"
            />
            <path
              class="f"
              d="m243.2,95.3h-6.7l-1.6,4.8h-2.8l6.4-17.6h3l6.4,17.6h-2.9l-1.6-4.8Zm-6-2.2h5.3l-2.6-7.7h0l-2.6,7.7Z"
            />
            <path
              class="f"
              d="m254.3,91.2c0-5.6,3.2-9.1,8.1-9.1s7,2.5,7.5,6.1h-2.7c-.5-2.3-2.4-3.7-4.8-3.7s-5.3,2.6-5.3,6.7,2.1,6.7,5.3,6.7,4.2-1.3,4.7-3.4h2.7c-.7,3.6-3.4,5.8-7.5,5.8s-8.1-3.5-8.1-9.1Z"
            />
            <path
              class="f"
              d="m277.5,91.2c0-5.6,3.2-9.1,8.1-9.1s7,2.5,7.5,6.1h-2.7c-.5-2.3-2.4-3.7-4.8-3.7s-5.3,2.6-5.3,6.7,2.1,6.7,5.3,6.7,4.2-1.3,4.7-3.4h2.7c-.7,3.6-3.4,5.8-7.5,5.8s-8.1-3.5-8.1-9.1Z"
            />
            <path
              class="f"
              d="m312.6,100h-11.2v-17.6h11.2v2.4h-8.4v5.2h8v2.3h-8v5.5h8.4v2.4Z"
            />
            <path
              class="f"
              d="m323.2,95.1c.2,1.7,1.9,2.9,4.2,2.9s3.8-1.1,3.8-2.7-1-2.2-3.2-2.7l-2.3-.5c-3.2-.8-4.7-2.3-4.7-4.7s2.6-5.1,6.4-5.1,6.3,2.1,6.4,5.1h-2.7c-.2-1.8-1.6-2.8-3.7-2.8s-3.6,1.1-3.6,2.6.9,2,3.2,2.5l1.9.5c3.6.9,5.1,2.3,5.1,4.9s-2.6,5.4-6.8,5.4-6.5-2-6.7-5.2h2.7Z"
            />
            <path
              class="f"
              d="m344.3,95.1c.2,1.7,1.9,2.9,4.2,2.9s3.8-1.1,3.8-2.7-1-2.2-3.2-2.7l-2.3-.5c-3.2-.8-4.7-2.3-4.7-4.7s2.6-5.1,6.4-5.1,6.3,2.1,6.4,5.1h-2.7c-.2-1.8-1.6-2.8-3.7-2.8s-3.6,1.1-3.6,2.6.9,2,3.2,2.5l1.9.5c3.6.9,5.1,2.3,5.1,4.9s-2.6,5.4-6.8,5.4-6.5-2-6.7-5.2h2.7Z"
            />
          </g>
          <g>
            <path
              class="g"
              d="m120.1,75.9V5.5h17.9v31h.4l24-31h19.2l-24.6,31.3,26,39.2h-21l-18-27.5-6,7.6v19.9h-17.9Z"
            />
            <path
              class="g"
              d="m187.4,8.5c0-4.9,4-8.5,8.9-8.5s8.9,3.7,8.9,8.5-4,8.5-8.9,8.5-8.9-3.6-8.9-8.5Zm.2,13h17.3v54.3h-17.3V21.6Z"
            />
            <path
              class="g"
              d="m249.1,42.9c-.6-5.6-4.1-9.3-9.4-9.3s-10.2,5.6-10.2,15.1,3.8,15.1,10.2,15.1,8.7-3.2,9.4-8.9h15.9c-.5,13.7-10.3,22.1-25.5,22.1s-27.5-10.7-27.5-28.4,10.5-28.3,27.4-28.3,25,9,25.5,22.5h-15.9Z"
            />
            <path
              class="g"
              d="m305.5,21.6h19.3l-19.5,23.3,20.7,31.1h-19.9l-13.5-20.7-3.3,3.9v16.8h-17.3V2h17.3v40.4h.3l16-20.8Z"
            />
            <path
              class="g"
              d="m344.7,55.5c.6,4.8,6.1,8.1,12.7,8.1s11.5-3.1,11.5-7.4-3-5.8-11-7.5l-9.2-1.8c-13-2.5-19.7-9.5-19.7-20.2s11.7-22.5,28-22.5,28,8.5,28.2,21.8h-16.5c-.3-5.1-5.1-8.2-11.5-8.2s-10.4,2.8-10.4,7.1,3.1,5.9,10.5,7.4l9.1,1.7c13.9,2.7,20.2,9,20.2,20.1s-11.6,22.9-29.7,22.9-29.1-8-29.2-21.6h17Z"
            />
            <path
              class="g"
              d="m415.7,9.6v12h9.8v12.8h-9.8v23.2c0,3.8,2.1,5.7,6.3,5.7s2.5,0,3.5-.2v12.3c-1.7.4-4.2.7-7.6.7-14,0-19.5-4.3-19.5-15v-26.7h-7.3v-12.8h7.3v-12h17.3Z"
            />
            <path
              class="g"
              d="m430.9,60.2c0-10.2,7.8-15.8,22-16.7l12.7-.8v-3.1c0-4.4-3.2-6.8-8.1-6.8s-7.9,2.5-8.3,5.9h-15.6c.4-11,10.1-18.3,24.8-18.3s24.1,7.4,24.1,18.3v37.2h-16.8v-7.8h-.3c-2.9,5.5-9.6,8.5-16.2,8.5-10.2,0-18.4-6.7-18.4-16.5Zm34.8-3.9v-3.8l-10,.7c-4.9.3-7.6,2.4-7.6,5.8s2.9,5.6,7.3,5.6,10.3-3.3,10.3-8.3Z"
            />
            <path
              class="g"
              d="m491.2,21.6h16.8v10.2h.3c2-7.2,6.4-10.9,12.8-10.9s3.3.3,4.4.7v14.8c-1.5-.6-3.5-1-5.6-1-7.4,0-11.5,4.2-11.5,11.8v28.7h-17.3V21.6Z"
            />
            <path
              class="g"
              d="m552.6,9.6v12h9.8v12.8h-9.8v23.2c0,3.8,2.1,5.7,6.3,5.7s2.5,0,3.5-.2v12.3c-1.7.4-4.2.7-7.6.7-14,0-19.5-4.3-19.5-15v-26.7h-7.3v-12.8h7.3v-12h17.3Z"
            />
          </g>
        </g>
      </svg>
    </div>
    <div class="callout-content dark:text-white">
      <h3 class="text-xl font-semibold">AI-Generated forms in seconds.</h3>
      <p class="text-gray-600 dark:text-gray-300">
        KickStart your next FormKit form in seconds. Generate from a prompt,
        image, or text attachment. Copy & paste as Vue components or FormKit
        schema.
      </p>

      <button
        class="flex items-center gap-2 border border-fuchsia-300 dark:border-fuchsia-800 px-4 py-2 mt-4 rounded bg-fuchsia-500 dark:bg-fuchsia-600 text-white text-sm"
      >
        Try it for free!
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
      </button>
    </div>
  </div>
</template>
