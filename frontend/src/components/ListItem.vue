<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'
import { COLOR } from '@/styles/theme'
import Button from './Button.vue'
import IconCircle from '~icons/fa6-solid/circle'
const props = defineProps<{
  id: number
  creator: string
  club: 'skkuding' | 'skkud'
  startTime: Date
  endTime: Date
  members: string[]
  purpose?: string
}>()

defineEmits(['edit', 'remove'])

const period = computed(() => {
  return (
    useDateFormat(props.startTime, 'HH:mm').value +
    '~' +
    useDateFormat(props.endTime, 'HH:mm').value
  )
})
</script>

<template>
  <div class="list-wrapper">
    <div class="list-header">
      <IconCircle class="circle-icon" />
      <div class="header-center">
        <p>{{ period }}</p>
        <p>{{ purpose || creator }}</p>
        <p>{{ members.length }} 명</p>
      </div>
      <div class="button-box">
        <Button color="green" @click="$emit(`edit`)">수정</Button>
        <Button color="dark-red" @click="$emit('remove')">삭제</Button>
      </div>
    </div>
    <div class="list-content" v-if="members.length !== 1">
      <div>
        <span>소속</span>
        <span>{{ club }}</span>
      </div>
      <div>
        <span>예약자</span>
        <span>{{ creator }}</span>
      </div>
      <div>
        <span>참가자</span>
        <div class="member-list">
          <span v-for="member in members" :key="member">
            {{ member }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-wrapper {
  width: 800px;
}
p,
span {
  font-weight: 500;
}
.list-header {
  border: 2px solid v-bind("COLOR['light-gray']");
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
}
.header-center {
  display: grid;
  grid-template-columns: 3fr 3fr 1.5fr;
  align-items: center;
  flex-grow: 1;
  margin: 0 3.5rem 0 3rem;
}
.header-center p:first-child {
  width: 96px;
  text-align: center;
}
.header-center p:last-child {
  text-align: right;
  color: v-bind("COLOR['dark-blue']");
}
.button-box {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
}
button {
  width: 56px;
  height: 30px;
  padding: 0;
  display: flex;
  justify-content: center;
}
.list-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 0.5rem;
  padding: 1rem 0 1rem 6.25rem;
  background-color: #f9eee0;
  border-radius: 0.5rem;
}
.list-content > div {
  display: flex;
  align-items: flex-start;
  gap: 5.95rem;
  text-transform: uppercase;
}
.list-content > div > span:first-child {
  text-align: center;
  flex-shrink: 0;
  flex-basis: 96px;
}
.member-list {
  flex-grow: 1;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
}
.circle-icon {
  width: 20px;
  height: 20px;
  color: v-bind("club === 'skkuding' ? COLOR.green : COLOR.blue");
  flex-shrink: 0;
}
</style>
