<script setup lang="ts">
import IconGithub from "~icons/fa6-brands/github";
import { TEXT_COLOR } from "@/styles/theme";
import { COLOR } from "@/styles/theme";
import { FONT_SIZE } from "@/styles/theme";
defineProps<{
  dayTime: string;
}>();
</script>

<template>
  <header class="header-wrapper">
    <div class="header-content-wrapper">
      <div class="letters">
        {{ dayTime }}
      </div>
      <div>
        <a
          href="https://github.com/skkuding/skkuzzim"
          target="_blank"
          class="letters"
        >
          <IconGithub />
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-wrapper {
  width: 100%;
  background: v-bind(
    '`linear-gradient(90deg, ${COLOR["green"]}, ${COLOR["blue"]}) `'
  );
  color: v-bind("TEXT_COLOR['white']");
  display: flex;
  align-items: center;
  height: 80px;
  position: sticky;
  top: 0;
  margin: 0;
}
.header-content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 5rem;
}
.letters {
  color: white;
  font-weight: bold;
  font-size: v-bind("FONT_SIZE['header']");
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
