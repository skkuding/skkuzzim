<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
defineProps<{
  msg: string;
}>();
library.add(faCircleCheck);
</script>

<template>
  <div class="toastWrapper">
    <font-awesome-icon icon="fa-solid fa-circle-check" />
    <div class="toastMessage">{{ msg }} 완료되었습니다!</div>
  </div>
</template>

<style scoped>
.toastWrapper {
  font-size: 20px;
  background-color: #8dc63f;
  padding: 10px;
  width: 250px;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  align-items: center;
}
.toastMessage {
  color: white;
  padding: 5px;
  padding-left: 10px;
  font-weight: 600;
}
</style>
