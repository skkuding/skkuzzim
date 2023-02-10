<script setup lang="ts">
import { FONT_SIZE } from '@/styles/theme'
import { COLOR } from '@/styles/theme'
import { TEXT_COLOR } from '@/styles/theme'
import IconCircleCheck from '~icons/fa6-regular/circle-check'
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="toast-wrapper">
    <IconCircleCheck />
    <p class="toast-message">{{ msg }}</p>
  </div>
</template>

<style scoped>
.toast-wrapper {
  font-size: v-bind("FONT_SIZE['title']");
  background-color: v-bind("COLOR['green']");
  padding: 10px;
  width: 250px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: v-bind("TEXT_COLOR['white']");
  align-items: center;
  position: fixed;
  top: 13%;
  left: 92%;
  transform: translate(-50%, -50%);
  z-index: 300;
}
.toast-message {
  color: v-bind("TEXT_COLOR['white']");
  padding: 5px;
  padding-left: 10px;
  font-weight: 600;
}
</style>
