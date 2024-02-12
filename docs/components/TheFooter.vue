<script lang="ts" setup></script>

<template>
  <footer
    class="bg-slate-50 py-8 border-t border-t-slate-200 dark:bg-black/25 dark:border-t-purple-950"
  >
    <div class="w-[calc(100%-4em)] max-w-3xl mx-auto my-16">
      <div class="sm:flex items-start justify-between">
        <div class="mb-8">
          <ClockFont
            chars="tempo"
            :start="true"
            :delay="0"
            class="text-3xl mb-4"
          />
          <NuxtLink
            to="https://formkit.com"
            class="head-message text-sm flex text-slate-500 hover:text-slate-800 transition-all dark:text-purple-200/75 dark:hover:text-slate-200"
          >
            <LogoMark class="w-3 mr-2 fill-[#FCAB5E]" /> Made with ♥ by the
            FormKit team.
          </NuxtLink>
        </div>
        <div>
          <h4 class="font-bold mb-4 text-slate-700 dark:text-slate-300">
            Our Projects
          </h4>
          <ul class="text-slate-600 mb-8 sm:mr-20 dark:text-slate-200">
            <li class="mb-2">
              <a
                href="https://formkit.com"
                class="border-b-2 border-slate-300 hover:border-slate-500 dark:border-slate-400 dark:hover:border-purple-300"
                >FormKit</a
              >
            </li>
            <li class="mb-2">
              <a
                href="https://auto-animate.formkit.com"
                class="border-b-2 border-slate-300 hover:border-slate-500 dark:border-slate-400 dark:hover:border-purple-300"
                >AutoAnimate</a
              >
            </li>
            <li class="mb-2">
              <a
                href="https://arrowjs.com"
                class="border-b-2 border-slate-300 hover:border-slate-500 dark:border-slate-400 dark:hover:border-purple-300"
                >ArrowJS</a
              >
            </li>
          </ul>
        </div>
        <div class="">
          <h4 class="font-bold mb-4 text-slate-700 dark:text-slate-300">
            Connect
          </h4>
          <ul class="socials mb-4 text-slate-400 dark:text-slate-300">
            <li class="mb-2">
              <a
                href="https://x.com/formkit"
                class="hover:text-slate-500 flex items-center gap-2 dark:hover:text-purple-300"
              >
                <svg
                  width="1200"
                  height="1227"
                  viewBox="0 0 1200 1227"
                  fill="currentColor"
                  class="h-5 w-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                  />
                </svg>
                @FormKit
              </a>
            </li>

            <li class="mb-2">
              <a
                href="https://discord.gg/Vhu97pAC76"
                class="hover:text-slate-500 flex items-center gap-2 dark:hover:text-purple-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.14 96.36"
                  fill="currentColor"
                  class="h-4 w-auto"
                >
                  <path
                    d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                  />
                </svg>
                Discord
              </a>
            </li>
            <li class="mb-2">
              <a
                href="https://www.youtube.com/formkit"
                class="hover:text-slate-500 flex items-center gap-2 dark:hover:text-purple-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  class="h-5 w-auto"
                  fill="currentColor"
                >
                  <path
                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                  ></path>
                </svg>
                YouTube
              </a>
            </li>
            <li class="mb-2">
              <a
                href="https://github.com/formkit/tempo"
                class="hover:text-slate-500 flex items-center gap-2 dark:hover:text-purple-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  class="h-5 w-auto"
                  fill="currentColor"
                >
                  <path
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <span class="text-slate-400 block mt-4 text-sm dark:text-purple-200/50">
        Released under the MIT License. &copy;
        {{ new Date().getFullYear() }} FormKit. All rights reserved.
      </span>
    </div>
  </footer>
</template>
