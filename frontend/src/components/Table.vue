<script setup lang="ts">
import { useNow } from '@vueuse/core'
import { COLOR, FONT_SIZE } from '@/styles/theme'
import { ref } from 'vue'

interface TimeRange {
  startTime: {
    hour: number
    minute: number
  }
  endTime: {
    hour: number
    minute: number
  }
}

const props = defineProps<{
  startTime: Date
}>()

// 현재 날짜 및 시각
const now = useNow()
const isTodayIncluded = ref(false)
const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// row header
const DAYS = ['월', '화', '수', '목', '금', '토', '일']
const DATE_MS = 86400000
const dates: Date[] = []
for (let i = 0; i < 7; i++) {
  const date = new Date(props.startTime.getTime() + DATE_MS * i)
  dates.push(date)
  if (isSameDate(date, new Date())) {
    isTodayIncluded.value = true
  }
}

// column header
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
const MINUTES = [0, 30]
const TIMES: Array<TimeRange> = []
for (let i = 1; i <= 30; i++) {
  TIMES.push({
    startTime: {
      hour: HOURS[Math.floor((i - 1) / 2)],
      minute: MINUTES[Math.floor((i - 1) % 2)]
    },
    endTime: {
      hour: HOURS[Math.floor(i / 2)],
      minute: MINUTES[Math.floor(i % 2)]
    }
  })
}
const getTimeRangeString = ({ startTime, endTime }: TimeRange) => {
  return `${startTime.hour}:${startTime.minute.toString().padStart(2, '0')}~${
    endTime.hour
  }:${endTime.minute.toString().padStart(2, '0')}`
}

const isCurrentTime = ({ startTime, endTime }: TimeRange) => {
  if (isTodayIncluded.value) {
    if (
      startTime.hour === now.value.getHours() &&
      startTime.minute <= now.value.getMinutes()
    ) {
      if (endTime.minute === 0) return true
      if (now.value.getMinutes() <= endTime.minute - 1) return true
      return false
    }
    return false
  }
  return false
}

const getStartTimeString = (
  date: Date,
  time: { hour: number; minute: number }
) => {
  const datetime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.hour,
    time.minute,
    0,
    0
  )
  return new Date(
    datetime.getTime() - datetime.getTimezoneOffset() * 60000
  ).toJSON()
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th v-for="(date, index) in dates" :key="index" class="row">
          <span
            :class="
              isSameDate(now, date)
                ? 'today'
                : DAYS[index] === '토'
                ? 'sat'
                : DAYS[index] === '일'
                ? 'sun'
                : ''
            "
          >
            <span class="day">{{ DAYS[index] }}</span>
            <span class="date">{{ date.getDate() }}</span>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(timeRange, index) in TIMES" :key="index">
        <th class="column">
          <span :class="isCurrentTime(timeRange) ? 'today' : ''">
            {{ getTimeRangeString(timeRange) }}
          </span>
        </th>
        <td v-for="(date, index) in dates" :key="index">
          <slot :name="getStartTimeString(date, timeRange.startTime)"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  font-size: v-bind('FONT_SIZE.content');
  border-spacing: 0;
}
.today {
  padding: 9px 5px;
  color: white;
  border-radius: 12px;
  background-color: v-bind('COLOR.yellow');
}
th.row .today {
  max-width: 64px;
  margin: 0 auto;
}
th.column .today {
  padding: 4px 6px;
}
.sat {
  color: v-bind('COLOR.blue');
}
.sun {
  color: v-bind('COLOR.red');
}
.date {
  font-weight: bold;
  font-size: v-bind('FONT_SIZE.content');
}
.day {
  font-weight: bold;
}
td,
th {
  min-width: 138px;
  height: 44px;
  padding: 0;
  border-bottom: 1px solid v-bind("COLOR['light-gray']");
  border-right: 1px solid v-bind("COLOR['light-gray']");
  text-align: center;
}
td:last-child,
th:last-child {
  border-right: none;
}
th.row {
  padding: 5px;
}
th.row > span {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
  font-size: v-bind('FONT_SIZE.title');
  font-weight: bold;
}
</style>
