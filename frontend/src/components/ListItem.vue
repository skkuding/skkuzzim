<script setup lang="ts">
// script 코드를 작성해주세요
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'
import { COLOR } from '@/styles/theme'
import Button from './Button.vue'
import IconCircle from '~icons/fa6-solid/circle'
const props = defineProps<{
  id: number
  creator: string
  club: string
  startTime: Date
  endTime: Date
  purpose?: string
  members?: string[]
}>()

const period = computed(() => {
  return (
    useDateFormat(props.startTime, 'hh:mm').value +
    '~' +
    useDateFormat(props.endTime, 'hh:mm').value
  )
})
</script>

<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div class="" style="display: flex; justify-content: center">
        <!-- circle -->
        <IconCircle color="red" style="padding-right: 0.5rem" />

        <!-- period -->
        <div>{{ period }}</div>
      </div>

      <!-- purpose -->
      <div style="grid-column: span 2 / span 2; margin-left: 1rem">
        {{ purpose || creator }}
      </div>

      <!-- number of member & buttons -->
      <div style="display: flex; align-items: center">
        <div style="margin-right: 1rem">{{ members?.length || 0 }} 명</div>
        <Button color="green" style="margin-right: 0.5rem">수정</Button>
        <Button color="dark-red">삭제</Button>
      </div>
    </div>
    <div class="list-content">
      <!-- left column -->
      <div style="text-align: end; margin-right: 2rem; row-gap: 1rem">
        <div>소속</div>
        <div>예약자</div>
        <div>참가자</div>
      </div>

      <!-- right column -->
      <div style="grid-column: span 3 / span 3; margin-left: 1rem">
        <div>{{ club }}</div>

        <div>{{ creator }}</div>

        <div class="member-list">
          <span
            v-for="member in members"
            :key="member"
            style="padding-right: 0.5rem"
          >
            {{ member }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-wrapper {
  width: fit-content;
  min-width: 800px;
}

.list-header {
  border: 2px solid v-bind("COLOR['light-gray']");
  border-radius: 0.5rem;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  /* justify-content: space-around; */
}

.list-content {
  background-color: #f9eee0;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 1rem;
}
</style>
