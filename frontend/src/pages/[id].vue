<script setup lang="ts">
import MyComponent from "@/components/MyComponent.vue";
defineProps<{
  id: string;
}>();
</script>

<template>
  <div>상세 정보 페이지 입니다 : id = {{ id }}</div>
  <MyComponent />
</template>
