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
      <div id="main">Main</div>
      <button id="test">button</button>
    </div>
  </div>
</template>

<style scoped>
#test {
  padding: 2px;
  background-color: red;
  color: white;
}
.wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: scroll;
}
#main {
  background-color: antiquewhite;
  padding: 10rem;
  height: 5000px;
  display: flex;
  justify-content: center;
}
</style>
