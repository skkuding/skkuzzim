<script setup lang="ts">
import Header from './components/Header.vue'
import Toast from './components/Toast.vue'
import { ref } from 'vue'
import { useToastMessage } from './stores/toastMessage'
const dayTime = ref('')
const toast = useToastMessage()
</script>

<template>
  <Toast :msg="toast.message" v-if="toast.message" />
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
