<script setup lang="ts">
import IconCircleCheck from "~icons/fa6-regular/circle-check";
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="toast-wrapper">
    <IconCircleCheck />
    <p class="toast-message">{{ msg }}</p>
  </div>
</template>

<style scoped>
.toast-wrapper {
  font-size: 20px;
  background-color: #8dc63f;
  padding: 10px;
  width: 250px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  align-items: center;
}
.toast-message {
  color: white;
  padding: 5px;
  padding-left: 10px;
  font-weight: 600;
}
</style>
