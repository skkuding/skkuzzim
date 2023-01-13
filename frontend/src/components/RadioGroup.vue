<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  values: string[];
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
  <div class="wrapper">
    <label v-for="value in values" :key="value">
      <input type="radio" :name="name" :value="value" v-model="model" />
      <span class="checkmark">
        <svg
          v-if="modelValue === value"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="5.5" fill="white" stroke="black" />
          <circle cx="6.0001" cy="6" r="2.4" fill="black" />
        </svg>
        <svg
          v-else
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="5.5" fill="white" stroke="black" />
        </svg>
      </span>
      <span>{{ value }}</span>
    </label>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
input {
  position: absolute;
  opacity: 0;
  width: 14px;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: inherit;
}
.checkmark {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
