import { useDateFormat } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import { computed, ref, watchEffect } from 'vue'
import axios from 'axios'

type Response = {
  startTime: string
  endTime: string
  skkuding: number
  skkud: number
  isFull: boolean
}[]

export const useReservationTable = (option: { routing: boolean }) => {
  const week = option.routing ? useRouteQuery<string>('week') : ref('0')
  const monday = computed(() => {
    const monday = new Date()
    const day = monday.getDay() || 7
    monday.setDate(monday.getDate() - (day - 1) + 7 * Number(week.value))
    monday.setHours(9)
    monday.setMinutes(0)
    monday.setSeconds(0)
    monday.setMilliseconds(0)
    return monday
  })
  const sunday = computed(() => {
    const sunday = new Date(monday.value)
    sunday.setDate(sunday.getDate() + 6)
    sunday.setHours(24)
    return sunday
  })

  // button click handler
  const weekHandler = (action: 'lastWeek' | 'today' | 'nextWeek') => {
    switch (action) {
      case 'lastWeek':
        week.value = `${Number(week.value) - 1}`
        break
      case 'today':
        week.value = '0'
        break
      case 'nextWeek':
        week.value = `${Number(week.value) + 1}`
        break
    }
  }

  // reservation table data
  const data = ref<Response>([])
  watchEffect(async () => {
    const startTime = ref(
      useDateFormat(monday, 'YYYY-MM-DD HH:mm:ss')
        .value.replace(' ', 'T')
        .concat('Z')
    )
    const endTime = ref(
      useDateFormat(sunday, 'YYYY-MM-DD HH:mm:ss')
        .value.replace(' ', 'T')
        .concat('Z')
    )
    const response = await axios.get(
      `/api/reservation?startTime=${startTime.value}&endTime=${endTime.value}`
    )
    data.value = response.data
  })

  return { weekHandler, monday, data }
}
