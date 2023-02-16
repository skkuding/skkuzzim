<script setup lang="ts">
import { COLOR, FONT_SIZE } from '@/styles/theme'
import IconX from '~icons/fa6-regular/circle-xmark'

defineProps<{
  placeholder?: string
  message?: string
  modelValue: string
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'cancel', value: void): void
}>()
</script>

<template>
  <div class="input-wrapper">
    <div class="input-x">
      <input
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <IconX class="icon" @click="$emit('cancel')" />
    </div>
    <p v-if="message">* {{ message }}</p>
  </div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}
.input-x {
  display: flex;
  flex-direction: row;
  align-items: center;
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
