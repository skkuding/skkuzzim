<script setup lang="ts">
import IconBrandsGithub from "~icons/fa6-brands/github";
defineProps<{
  dayTime: string;
}>();
</script>

<template>
  <header class="header-wrapper">
    <!-- <div
      class="letters"
      v-if="startTime && endTime ? `${{ year }} year` : `${{ month }} month`"
    ></div> -->
    <div class="header-content-wrapper">
      <div class="letters">
        {{ dayTime }}
      </div>
      <div>
        <a href="https://github.com/skkuding/skkuzzim" target="_blank">
          <IconBrandsGithub class="letters" />
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-wrapper {
  width: 100%;
  background: linear-gradient(90deg, #8dc63f, #3f9dc6);
  color: white;
  display: flex;
  align-items: center;
  height: 80px;
  position: sticky;
  top: 0;
  margin: 0;
  padding: 0 5rem;
}
.header-content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
}
.letters {
  color: white;
  font-weight: bold;
  font-size: 32px;
}
</style>
