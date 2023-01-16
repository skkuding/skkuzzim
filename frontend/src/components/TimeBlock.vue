<script setup lang="ts">
import { COLOR } from '@/styles/theme'
defineProps<{
  member: number
  club?: 'skkuding' | 'skkud'
}>()
</script>

<template>
  <div :class="member === 8 ? '' : club">{{ member }}</div>
</template>

<style scoped>
div {
  width: v-bind('`${12.5 * member}%`');
  height: 100%;
  border-radius: 8px;
  background-color: v-bind("COLOR['dark-red']");
  color: white;
  font-weight: bold;
  text-align: v-bind("member === 1 ? 'center' : 'right'");
  padding: v-bind("member === 1 ? '5px 3px' : '5px'");
}
.skkuding {
  background-color: v-bind('COLOR.green');
}
.skkud {
  background-color: v-bind('COLOR.blue');
}
</style>
