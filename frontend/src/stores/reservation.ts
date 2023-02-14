import { ref } from 'vue'
import { defineStore } from 'pinia'

interface State {
  creator: string
  club: 'SKKUDING' | 'SKKU.D'
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
    club: 'SKKUDING',
    memberCnt: '',
    startTime: '',
    endTime: '',
    purpose: '',
    members: []
  })
  const reset = () => {
    reservation.value = {
      creator: '',
      club: 'SKKUDING',
      memberCnt: '',
      startTime: '',
      endTime: '',
      purpose: '',
      members: []
    }
  }
  const initializeMembers = () => {
    return Array<string>(Number(reservation.value.memberCnt) - 1).fill('')
  }

  const validate = (key: keyof State, index = 0) => {
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
      } else if (
        Number(reservation.value.memberCnt) > 8 ||
        Number(reservation.value.memberCnt) <= 0
      ) {
        return '1 이상 8 이하의 숫자만 입력해주세요'
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
      if (reservation.value.members[index] === '') {
        return '참가자 이름을 입력해주세요'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  return { reservation, clubs, reset, validate, initializeMembers }
})
