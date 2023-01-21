<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header :year="2023" :month="1" class="header"></Header>
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
</style>
