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

interface EditInfo {
  id: number
  creator: string
  club: 'skkuding' | 'skkud'
  purpose: string
  members: string[]
  startTime: string
  endTime: string
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

export const useEditStore = defineStore('edit', () => {
  // const date = new Date()
  const clubs = ['skkuding', 'skkud']
  const editInfo = ref<EditInfo>({
    id: 0,
    club: 'skkuding',
    startTime: '',
    endTime: '',
    purpose: '',
    creator: '',
    members: []
  })
  const resetEdit = () => {
    editInfo.value = {
      id: 0,
      club: 'skkuding',
      startTime: '',
      endTime: '',
      creator: '',
      purpose: '',
      members: []
    }
  }
  const validateEdit = (key: keyof EditInfo, index = 0) => {
    if (key === 'purpose') {
      if (editInfo.value.purpose === '') {
        return '모임 이름을 입력해주세요'
      } else {
        return ''
      }
    } else if (key === 'members') {
      if (editInfo.value.members[index] === '') {
        return '참가자 이름을 입력해주세요'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  return { editInfo, clubs, resetEdit, validateEdit }
})
