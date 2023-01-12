<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  color?: string;
}>();

const backgroundColor = computed(() => {
  if (props.color == "green") {
    return "background-color: #8DC63F; border-style: hidden; color: white"; //font-color 안먹힘
  } else if (props.color == "red") {
    return "background-color: #C63F3F; border-style: hidden; color: white";
  } else if (props.color == "pink") {
    return "background-color: #FF6663; border-style: hidden; color: white";
  } else if (props.color == "gray") {
    return "background-color: #808080; border-style: hidden; color: white";
  } else if (props.color == "white") {
    return "background-color: #FFFFFF; border: 2px; border-color: #404040; border-style: solid;";
  } else {
    return "";
  }
});
</script>

<template>
  <button class="a" :style="backgroundColor"><slot /></button>
</template>

<style scoped>
.a {
  border-radius: 8px;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  align-content: space-between;
  font-weight: bold;
}
</style>
