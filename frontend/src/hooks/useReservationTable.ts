import { useDateFormat } from '@vueuse/core'
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

type Response = {
  startTime: string
  endTime: string
  skkuding: number
  skkud: number
  isFull: boolean
}[]

export const useReservationTable = (options: { routing: boolean }) => {
  const route = useRoute()
  const router = useRouter()
  const week = ref(
    options.routing && route.query.week ? Number(route.query.week) : 0
  )
  const monday = computed(() => {
    const monday = new Date()
    const day = monday.getDay() || 7
    monday.setDate(monday.getDate() - (day - 1) + 7 * week.value)
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
        options.routing
          ? router.replace(`/?week=${week.value - 1}`).then(() => {
              week.value -= 1
            })
          : (week.value -= 1)
        break
      case 'today':
        options.routing
          ? router.replace('/?week=0').then(() => {
              week.value = 0
            })
          : (week.value = 0)
        break
      case 'nextWeek':
        options.routing
          ? router.replace(`/?week=${week.value + 1}`).then(() => {
              week.value += 1
            })
          : (week.value -= 1)
        break
    }
  }

  // reservation data
  const data = ref<Response>([])
  watchEffect(async () => {
    const startTime = ref(
      useDateFormat(monday, 'YYYY-MM-DD HH:mm:ss').value.replace(' ', 'T')
    )
    const endTime = ref(
      useDateFormat(sunday, 'YYYY-MM-DD HH:mm:ss').value.replace(' ', 'T')
    )
    const response = await axios.get(
      `/api/reservation?startTime=${startTime.value}&endTime=${endTime.value}`
    )
    data.value = response.data
  })

  return { weekHandler, monday, data }
}
