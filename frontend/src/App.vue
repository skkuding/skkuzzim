<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Toast from "./components/Toast.vue";
</script>

<template>
  <div class="wrapper">
    <Header :year="2023" :month="1" class="header"></Header>
    <div>
      <Toast msg="삭제가" />
      <div>Main</div>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
}
.wrapper {
  box-sizing: border-box;
  width: 1640px;
  margin: 0;
  padding: 0;
  height: 100%;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
