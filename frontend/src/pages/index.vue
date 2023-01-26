<script setup lang="ts">
import Table from '@/components/Table.vue'
import Button from '@/components/Button.vue'
import TimeBlock from '@/components/TimeBlock.vue'
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useDateFormat } from '@vueuse/core'
import IconChevronLeft from '~icons/fa6-solid/chevron-left'
import IconChevronRight from '~icons/fa6-solid/chevron-right'

const emit = defineEmits<{
  (e: 'dayTime', value: string): void
}>()
const week = ref(0)
const dates = computed(() => {
  const monday = new Date()
  const day = monday.getDay() || 7
  monday.setDate(monday.getDate() - (day - 1) + 7 * week.value)
  monday.setHours(9)
  monday.setMinutes(0)
  monday.setSeconds(0)
  monday.setMilliseconds(0)
  const sunday = new Date(monday)
  sunday.setDate(sunday.getDate() + 6)
  sunday.setHours(23)
  sunday.setMinutes(59)
  sunday.setSeconds(0)
  sunday.setMilliseconds(0)
  return {
    monday,
    sunday
  }
})

// header
const dayTime = computed(
  () => useDateFormat(dates.value.monday, 'YYYY년 M월').value
)
emit('dayTime', dayTime.value)
watch(dayTime, (value) => {
  emit('dayTime', value)
})

// api request
const startTime = computed(() =>
  useDateFormat(dates.value.monday, 'YYYY-MM-DD HH:mm:ss.000')
    .value.replace(' ', 'T')
    .concat('Z')
)
const endTime = computed(() =>
  useDateFormat(dates.value.sunday, 'YYYY-MM-DD HH:mm:ss.000')
    .value.replace(' ', 'T')
    .concat('Z')
)

// response example
const data = [
  {
    startTime: '2023-01-26T16:00:00.000Z',
    endTime: '',
    skkuding: 2,
    skkud: 5,
    isFull: false
  },
  {
    startTime: '2023-01-26T10:00:00.000Z',
    endTime: '',
    skkuding: 3,
    skkud: 5,
    isFull: true
  },
  {
    startTime: '2023-01-26T09:00:00.000Z',
    endTime: '',
    skkuding: 1,
    skkud: 0,
    isFull: false
  }
]

// button click event handlers
const weekHandler = (action: 'lastWeek' | 'today' | 'nextWeek') => {
  switch (action) {
    case 'lastWeek':
      week.value -= 1
      break
    case 'today':
      week.value = 0
      break
    case 'nextWeek':
      week.value += 1
      break
  }
}
</script>

<template>
  <div class="index-wrapper">
    <div class="button-wrapper">
      <Button color="white" @click="weekHandler('lastWeek')">
        <IconChevronLeft width="10" height="16" />
        지난주
      </Button>
      <div>
        <Button color="gray" @click="weekHandler('today')">오늘</Button>
        <Button color="white" @click="weekHandler('nextWeek')">
          다음주
          <IconChevronRight width="10" height="16" />
        </Button>
      </div>
    </div>
    <Table :monday="dates.monday">
      <template
        v-for="({ startTime, skkuding, skkud, isFull }, index) in data"
        :key="index"
        v-slot:[startTime]
      >
        <RouterLink :to="`/${startTime}`" class="block-wrapper" v-if="isFull">
          <TimeBlock :member="8" />
        </RouterLink>
        <RouterLink :to="`/${startTime}`" class="block-wrapper" v-else>
          <TimeBlock :member="skkuding" club="skkuding" v-if="skkuding !== 0" />
          <TimeBlock :member="skkud" club="skkud" v-if="skkud !== 0" />
        </RouterLink>
      </template>
    </Table>
  </div>
</template>

<style scoped>
.index-wrapper {
  margin: 3rem 0 5rem;
}
.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.button-wrapper > div {
  display: flex;
  align-items: center;
  gap: 24px;
}
.button-wrapper button {
  height: 36px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-width: 78px;
}
.block-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 6px 5px;
}
.block-wrapper > div {
  min-width: 15px;
}
</style>
