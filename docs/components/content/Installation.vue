<script setup lang="ts"></script>

<template>
  <PageSection>
    <HeadingSection title="Install" class="text-sky-500" />
    <p>
      Pshhh, come on — you already know how to do this. All you’re looking for
      is the package name (it’s <code>@formkit/tempo</code>), but to make it
      even easier just click your package manager of choice to copy the
      install&nbsp;command.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <CopyCode>
        <div class="flex items-center">
          <img
            src="~/assets/pnpm.svg"
            loading="lazy"
            aria-hidden
            class="w-4 mr-3"
            alt="pnpm"
          />pnpm add @formkit/tempo
        </div>
      </CopyCode>
      <CopyCode>
        <div class="flex items-center">
          <img
            src="~/assets/npm.svg"
            loading="lazy"
            aria-hidden
            class="w-4 mr-3"
            alt="npm"
          />npm install @formkit/tempo
        </div>
      </CopyCode>
      <CopyCode>
        <div class="flex items-center">
          <img
            src="~/assets/yarn.svg"
            loading="lazy"
            aria-hidden
            class="w-4 mr-3"
            alt="yarn"
          />yarn add @formkit/tempo
        </div>
      </CopyCode>
      <CopyCode>
        <div class="flex items-center">
          <img
            src="~/assets/bun.svg"
            loading="lazy"
            aria-hidden
            class="w-4 mr-3"
            alt="bun"
          />bun install @formkit/tempo
        </div>
      </CopyCode>
    </div>
    <p>
      Since tempo is just a collection of functions, you use them by importing
      them from the <code>@formkit/tempo</code> project — great for tree
      shaking.
    </p>
  </PageSection>
</template>
