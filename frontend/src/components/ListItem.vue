<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'
import { COLOR } from '@/styles/theme'
import Button from './Button.vue'
import IconCircle from '~icons/fa6-solid/circle'
import dayjs from 'dayjs'

type Item = {
  id: number
  creator: string
  club: 'skkuding' | 'skkud'
  startTime: string
  endTime: string
  members: string[]
  purpose?: string
}

const props = defineProps<{
  item: Item
}>()

defineEmits<{
  (e: 'edit', id: number): void
  (e: 'remove', id: number): void
}>()

const period = computed(() => {
  return (
    dayjs(props.item.startTime).format('HH:mm') +
    '~' +
    dayjs(props.item.endTime).format('HH:mm')
  )
})
</script>

<template>
  <div class="list-wrapper">
    <div class="list-header">
      <div>
        <IconCircle class="circle-icon" />
        <p class="period">{{ period }}</p>
      </div>
      <div>
        <p class="purpose">{{ item.purpose || item.creator }}</p>
        <p class="member-cnt">{{ item.members.length }} 명</p>
        <div class="button-box">
          <Button color="green" @click="$emit('edit', item.id)">수정</Button>
          <Button color="dark-red" @click="$emit('remove', item.id)">
            삭제
          </Button>
        </div>
      </div>
    </div>
    <div class="list-content" v-if="item.members.length !== 1">
      <div>
        <div class="label">
          <span>소속</span>
        </div>
        <span>{{ item.club }}</span>
      </div>
      <div>
        <div class="label">
          <span>예약자</span>
        </div>
        <span>{{ item.creator }}</span>
      </div>
      <div>
        <div class="label">
          <span>참가자</span>
        </div>
        <div class="member-list">
          <span v-for="member in item.members" :key="member">
            {{ member }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-wrapper {
  max-width: 800px;
  width: 100%;
}
p,
span {
  font-weight: 500;
}
.list-header {
  border: 2px solid v-bind("COLOR['light-gray']");
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 6rem;
}
.list-header > div {
  display: flex;
  align-items: center;
}
.list-header > div:last-child {
  gap: 3rem;
}
.period {
  flex-grow: 1;
  text-align: right;
}
.purpose {
  flex-grow: 1;
}
.member-cnt {
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
  padding: 1rem 2rem;
  background-color: #f9eee0;
  border-radius: 0.5rem;
}
.list-content > div {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 6rem;
  text-transform: uppercase;
}
.label {
  display: flex;
  justify-content: flex-end;
}
.label > span {
  flex-basis: 45px;
  text-align: center;
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
  color: v-bind("item.club === 'skkuding' ? COLOR.green : COLOR.blue");
  flex-shrink: 0;
}
</style>
