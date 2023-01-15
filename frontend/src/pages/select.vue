<script setup lang="ts">
import MyComponent from '@/components/MyComponent.vue'
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>

<template>
  <div>시간 선택 페이지입니다!</div>
  <div>count = {{ counter.count }}</div>
  <button @click="counter.increment">Click</button>
  <MyComponent />
</template>
