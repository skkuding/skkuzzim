<script setup lang="ts">
import { COLOR } from '@/styles/theme'

defineProps<{
  color?: keyof typeof COLOR | 'white'
}>()
</script>

<template>
  <button :class="color === 'white' ? 'white-button' : 'colored-button'">
    <slot />
  </button>
</template>

<style scoped>
button {
  align-items: center;
  border: none;
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

.white-button {
  background-color: white;
  border: 2px solid v-bind('COLOR.gray');
  color: v-bind("COLOR['dark-gray']");
}

.colored-button {
  background-color: v-bind("COLOR[color || 'green']");
  color: white;
}
</style>
