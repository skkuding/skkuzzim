import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

interface State {
  creator: string
  club: string
  memberCnt: string
  startTime: string
  endTime: string
  purpose: string
  members: string[]
}

export const useReservationStore = defineStore('reservation', () => {
  const clubs = ['SKKUDING', 'SKKU.D']
  const reservation = ref<State>({
    creator: '',
    club: clubs[0],
    memberCnt: '',
    startTime: '',
    endTime: '',
    purpose: '',
    members: []
  })
  const reset = () => {
    reservation.value = {
      creator: '',
      club: clubs[0],
      memberCnt: '',
      startTime: '',
      endTime: '',
      purpose: '',
      members: []
    }
  }
  const validate = (key: keyof State) => {
    if (key === 'creator') {
      if (reservation.value.creator === '') {
        return '예약자 이름을 입력해주세요'
      } else {
        return ''
      }
    } else if (key === 'memberCnt') {
      if (reservation.value.memberCnt === '') {
        return '예약 인원을 입력해주세요'
      } else if (Number.isNaN(Number(reservation.value.memberCnt))) {
        return '숫자만 입력해주세요'
      } else if (Number(reservation.value.memberCnt) > 8) {
        return '8 이하의 숫자만 입력해주세요'
      } else {
        return ''
      }
    } else if (key === 'purpose') {
      if (reservation.value.purpose === '') {
        return '예약 목적을 입력해주세요'
      } else {
        return ''
      }
    } else if (key === 'members') {
      const messages = reservation.value.members.map((member) =>
        member === '' ? '참가자 이름을 입력해주세요' : ''
      )
      return messages
    } else {
      return ''
    }
  }
  watch(
    () => reservation.value.memberCnt,
    (value) => {
      if (!Number.isNaN(Number(value))) {
        reservation.value.members = Array(Number(value)).fill('')
      }
    }
  )

  return { reservation, clubs, reset, validate }
})
