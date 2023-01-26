<script setup lang="ts">
import { COLOR, FONT_SIZE } from '@/styles/theme'
defineProps<{
  placeholder?: string
  message?: string
  modelValue: string
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div>
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <p v-if="message">* {{ message }}</p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}
input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  border-bottom: 1px solid black;
}
p {
  font-size: v-bind('FONT_SIZE.description');
  color: v-bind('COLOR.red');
}
</style>
