<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
defineProps<{
  year: number;
  month: number;
}>();
library.add(faGithub);
</script>

<template>
  <div class="headerWrapper">
    <div class="letters">{{ year }}년 {{ month }}월</div>
    <div>
      <font-awesome-icon icon="fa-brands fa-github" class="letters" />
    </div>
  </div>
</template>

<style scoped>
.headerWrapper {
  width: 100%;
  background: linear-gradient(90deg, #8dc63f,#3f9dc6);
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  position: sticky;
  width: 100%;
  margin: 0;
}
.letters {
  color: white;
  font-weight: bold;
  font-size: 32px;
}
</style>