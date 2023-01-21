<script setup lang="ts">
import IconBrandsGithub from "~icons/fa6-brands/github";
const props = defineProps<{
  year?: number;
  month: number;
  day?: number;
  startTime?: number;
  endTime?: number;
}>();
// console.log("time is", props.month);
</script>

<template>
  <header class="headerWrapper">
    <!-- <div
      class="letters"
      v-if="startTime && endTime ? `${{ year }} year` : `${{ month }} month`"
    ></div> -->
    <div class="letters" v-if="startTime && endTime && !year && day">
      {{ month }}월 {{ day }}일 {{ startTime }} ~ {{ endTime }}
    </div>
    <div class="letters" v-if="year && !day && !startTime && !endTime">
      {{ year }}년 {{ month }}월
    </div>
    <div>
      <a href="https://github.com/skkuding/skkuzzim" target="_blank">
        <IconBrandsGithub class="letters" />
      </a>
    </div>
  </header>
</template>

<style scoped>
.headerWrapper {
  width: 100%;
  background: linear-gradient(90deg, #8dc63f, #3f9dc6);
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  position: sticky;
  top: 0;
  margin: 0;
}
.letters {
  color: white;
  font-weight: bold;
  font-size: 32px;
}
</style>
