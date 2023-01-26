<script setup lang="ts">
import Header from './components/Header.vue'
import { ref } from 'vue'
const dayTime = ref('')
</script>

<template>
  <Header :day-time="dayTime" />
  <main class="wrapper">
    <router-view @day-time="(value: string) => (dayTime = value)" />
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
