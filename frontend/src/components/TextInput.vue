<script setup lang="ts">
import { COLOR, FONT_SIZE } from "@/styles/theme";
import { computed } from "vue";
const props = defineProps<{
  placeholder?: string;
  message?: string;
  modelValue: string;
}>();
const emit = defineEmits<{
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
  <div>
    <input type="text" :placeholder="placeholder" v-model="model" />
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
  border: none;
  outline: none;
  font-size: 16px;
  border-bottom: 1px solid black;
}
p {
  font-size: v-bind("FONT_SIZE.description");
  color: v-bind("COLOR.red");
}
</style>
