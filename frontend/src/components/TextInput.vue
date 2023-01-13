<script setup lang="ts">
import { COLOR, FONT_SIZE } from "@/styles/theme";
import IconCircleXmark from "~icons/fa6-solid/circle-xmark";
import { computed } from "vue";

const props = defineProps<{
  placeholder?: string;
  message: string;
  removeButton?: boolean;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "remove"): void;
  (e: "update:modelValue", value: string): void;
}>();

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="input-box">
      <input type="text" v-model="model" :placeholder="placeholder || ''" />
      <button type="button" v-if="removeButton" @click="$emit('remove')">
        <IconCircleXmark />
      </button>
    </div>
    <p>{{ message ? `*${message}` : "" }}</p>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
}
.input-box {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
}
input {
  border: none;
  outline: none;
  font-size: 16px;
  flex-grow: 1;
}
p {
  font-size: v-bind("FONT_SIZE.description");
  color: v-bind("COLOR.red");
}
button {
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
button svg {
  color: v-bind("COLOR.gray");
}
</style>
