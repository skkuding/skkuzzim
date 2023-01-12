<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Button from "./components/Button.vue";
import HelloWorld from "./components/HelloWorld.vue";
import IconRegularClock from '~icons/fa6-regular/clock'

</script>

<template>
  <Button color="green">수정</Button>
  <Button color="red">삭제</Button>
  <Button color="gray">오늘</Button>
  <Button color="pink">돌아가기</Button>
  <Button color="white">+ 추가</Button>
  <Button color="green">+ 생성</Button>
  <Button color="white">&lt &nbsp지난 주</Button>
  <Button color="white"><IconRegularClock/>&nbsp&nbsp1/23 (월) 12:00 ~ 13:00</Button>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
