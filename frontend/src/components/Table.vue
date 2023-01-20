<script setup lang="ts">
import { useDateFormat, useNow } from '@vueuse/core'
import { COLOR, FONT_SIZE } from '@/styles/theme'
import { computed, ref } from 'vue'

const props = defineProps<{
  monday: Date
}>()

type Day = {
  day: string
  date: string // YYYY-MM-DD
  style?: 'current' | 'sat' | 'sun'
}

const now = useNow()
const isThisWeek = ref(false)

// 헤더: 일주일 동안의 요일과 날짜, css 스타일 정보
const week = computed(() => {
  const DAYS = ['월', '화', '수', '목', '금', '토', '일']
  const format = 'YYYY-MM-DD'
  return new Array<Day>(7)
    .fill({
      day: '',
      date: ''
    })
    .map((x, i) => {
      const temp = Object.assign({}, x)
      temp.day = DAYS[i]
      const date = new Date(props.monday).setDate(props.monday.getDate() + i)
      temp.date = useDateFormat(date, format).value
      temp.style =
        temp.date === useDateFormat(now, format).value
          ? 'current'
          : temp.day === '토'
          ? 'sat'
          : temp.day === '일'
          ? 'sun'
          : temp.style
      if (temp.style === 'current') isThisWeek.value = true
      return temp
    })
})

// 행: 시작시간과 끝시간
const HOURS = [
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
].map((x) => x.toString().padStart(2, '0'))
const MINUTES = ['00', '30']
const PERIODS = new Array(30)
  .fill({
    start: '00:00',
    end: '24:00'
  })
  .map((x, i) => {
    return {
      start: `${HOURS[Math.floor(i / 2)]}:${MINUTES[Math.floor(i % 2)]}`,
      end: `${HOURS[Math.floor((i + 1) / 2)]}:${
        MINUTES[Math.floor((i + 1) % 2)]
      }`
    }
  })

const isNow = (start: string) => {
  if (!isThisWeek.value) return false
  const nowH = now.value.getHours()
  const nowM = now.value.getMinutes()
  const startH = parseInt(start.substring(0, 2))
  const startM = parseInt(start.substring(3, 5))
  if (
    (startH === nowH && startM === 0 && nowM < 30) ||
    (startH === nowH && startM === 30 && 30 <= nowM && nowM < 60)
  )
    return true
  return false
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th />
        <th
          v-for="({ day, date, style }, index) in week"
          :key="index"
          class="row"
        >
          <div :class="style">
            <span class="day">{{ day }}</span>
            <span class="date">{{ useDateFormat(date, 'DD').value }}</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="({ start, end }, index) in PERIODS" :key="index">
        <th class="column">
          <div :class="isNow(start) ? 'current' : ''">
            <span>{{ start }} ~ {{ end }}</span>
          </div>
        </th>
        <td v-for="({ date }, index) in week" :key="index">
          <slot :name="`${date}T${start}:00.000Z`" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-spacing: 0;
}

td,
th {
  width: 12.5%;
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
.current {
  width: fit-content;
  margin: 0 auto;
  padding: 4px 6px;
  color: white;
  border-radius: 12px;
  background-color: v-bind('COLOR.yellow');
}
th.column {
  padding: 5px 0;
}
th.row .current {
  margin-bottom: 5px;
  padding: 9px 16px;
}
th.row > div {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 4px;
}
.sat {
  color: v-bind('COLOR.blue');
}
.sun {
  color: v-bind('COLOR.red');
}
.date {
  font-weight: bold;
}
.day {
  font-weight: bold;
  font-size: v-bind('FONT_SIZE.title');
}
</style>
