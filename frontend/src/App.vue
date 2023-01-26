<script setup lang="ts">
// write script code
</script>

<template>
  <main class="wrapper">
    <router-view />
  </main>
</template>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 80rem;
  padding-left: 5rem;
  padding-right: 5rem;
}
#modal-content-test {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
