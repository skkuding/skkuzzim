<script setup lang="ts">
import { computed } from "vue";
import IconCircle from "~icons/fa6-regular/circle";
import IconCircleDot from "~icons/fa6-regular/circle-dot";

const props = defineProps<{
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
      <input type="radio" name="club" :value="value" v-model="model" />
      <IconCircleDot v-if="modelValue === value" width="14" height="14" />
      <IconCircle v-else width="14" height="14" />
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
  appearance: none;
  width: 14px;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: inherit;
}
</style>
