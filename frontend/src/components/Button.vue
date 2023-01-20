<script setup lang="ts">
import { COLOR } from '@/styles/theme'

defineProps<{
  color?: keyof typeof COLOR | 'white'
}>()
</script>

<template>
  <button :class="{ 'colored-button': color !== 'white' }">
    <slot />
  </button>
</template>

<style scoped>
button {
  align-items: center;
  background-color: v-bind(
    "!color || color ==='white' ? 'white': COLOR[color]"
  );
  border: 2px solid v-bind('COLOR.gray');
  color: v-bind("COLOR['dark-gray']");
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  padding: 0.5rem 1rem;
}

button:hover {
  opacity: 0.8;
}

button:active {
  opacity: 1;
}

.colored-button {
  border: none;
  color: white;
}
</style>
