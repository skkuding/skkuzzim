<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
defineProps<{
  year: number;
  month: number;
}>();
library.add(faGithub);
import IconBrandsGithub from '~icons/fa6-brands/github'
</script>

<template>
  <div class="headerWrapper">
    <div class="letters">{{ year }}년 {{ month }}월</div>
    <div>
      <a href="https://github.com/skkuding/skkuzzim" target="_blank">
        <IconBrandsGithub class="letters" />
      </a>
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
  top:0;
  width: 100%;
  margin: 0;
}
.letters {
  color: white;
  font-weight: bold;
  font-size: 32px;
}
</style>