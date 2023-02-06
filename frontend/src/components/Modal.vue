<script setup lang="ts">
import Button from './Button.vue'
import { OnClickOutside } from '@vueuse/components'
import { FONT_SIZE, COLOR } from '@/styles/theme'

defineProps<{
  title: string
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel', value: void): void
  (e: 'confirm', value: void): void
}>()
</script>

<template>
  <div v-if="modelValue" class="modal-wrapper">
    <OnClickOutside @trigger="$emit('update:modelValue', false)">
      <div class="modal-container">
        <h1 class="title">
          {{ title }}
        </h1>
        <div class="content">
          <slot />
        </div>
        <div class="button-wrapper">
          <Button
            color="red"
            @click="$emit('cancel'), $emit('update:modelValue', false)"
          >
            취소
          </Button>
          <Button color="green" @click="$emit('confirm')">확인</Button>
        </div>
      </div>
    </OnClickOutside>
  </div>
</template>

<style scoped>
.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}
.modal-container {
  background-color: white;
  padding: 1.5rem 3rem;
  border-radius: 0.5rem;
  border: 1px solid v-bind("COLOR['light-gray']");
  box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  align-items: center;
  width: 428px;
  min-height: 10rem;
  z-index: 50;
}
.title {
  font-weight: bold;
  font-size: v-bind('FONT_SIZE.title');
}
.content {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.button-wrapper {
  display: flex;
  justify-content: space-between;
  width: 10rem;
}
</style>
