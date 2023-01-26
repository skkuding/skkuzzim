<script setup lang="ts">
import MyComponent from '@/components/MyComponent.vue'
import { COLOR } from '@/styles/theme'
</script>

<template>
  <div class="colored">메인 페이지 입니다!</div>
  <MyComponent />
</template>

<style scoped>
.colored {
  color: v-bind('COLOR.red');
}
</style>
