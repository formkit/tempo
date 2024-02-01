<template>
  <div class="gradient"></div>
  <TheHeader />
  <ContainerSection>
    <TheNavigation />
    <main>
      <CodeExample file="example1" />
    </main>
  </ContainerSection>
</template>

<style>
.gradient {
  animation: unblur 2s forwards;
  animation-delay: 1s;
  background: radial-gradient(50% 50% at 50% 50%, #43bff8, #eeefef);
  filter: blur(100px);
  height: 30vh;
  opacity: 0;
  position: fixed;
  top: 5vh;
  width: 100%;
  z-index: -1;
}

@keyframes unblur {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
