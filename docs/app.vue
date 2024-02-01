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
  background: radial-gradient(50% 50% at 50% 50%, #088fce, #eeefef);
  filter: blur(180px);
  height: 23vh;
  opacity: 0.8;
  position: absolute;
  top: 6vh;
  width: 100%;
  z-index: -1;
}
</style>
