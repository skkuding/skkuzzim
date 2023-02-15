<script setup lang="ts">
import Table from '@/components/Table.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import TextInput from '@/components/TextInput.vue'
import IconChevronLeft from '~icons/fa6-solid/chevron-left'
import IconChevronRight from '~icons/fa6-solid/chevron-right'
import IconPlus from '~icons/fa6-solid/plus'
import axios from 'axios'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { COLOR } from '@/styles/theme'
import { useDateFormat } from '@vueuse/core'
import { useReservationStore } from '@/stores/reservation'
import { useEditStore } from '@/stores/reservation'
import { storeToRefs } from 'pinia'
import { useReservationTable } from '@/composables/useReservationTable'
import { useModalStore } from '@/stores/modal'
import { useToastMessage } from '@/stores/toastMessage'

const router = useRouter()
const { monday, data, weekHandler } = useReservationTable({ routing: false })

// header
const emit = defineEmits<{
  (e: 'dayTime', value: string): void
}>()
const dayTime = computed(() => useDateFormat(monday, 'YYYY년 M월').value)
emit('dayTime', dayTime.value)
watch(dayTime, (value) => {
  emit('dayTime', value)
})

// select time
const store = useReservationStore()
const { reservation } = storeToRefs(store)
const editStore = useEditStore()
const { editInfo } = storeToRefs(editStore)
const modalStore = useModalStore()
const { editModal } = storeToRefs(modalStore)
const selectedTime = ref({
  startTime: '',
  endTime: ''
})
const canSelect = (total: number) => {
  return total + Number(reservation.value.memberCnt) <= 8
}
const isSelected = (startTime: string, endTime: string) => {
  if (
    Date.parse(startTime) >= Date.parse(selectedTime.value.startTime) &&
    Date.parse(endTime) <= Date.parse(selectedTime.value.endTime)
  ) {
    return true
  }
  return false
}
const selectTime = (startTime: string, endTime: string) => {
  if (selectedTime.value.startTime === '') {
    selectedTime.value.startTime = startTime
    selectedTime.value.endTime = endTime
  } else {
    // validation
    const [start, end] =
      Date.parse(selectedTime.value.startTime) > Date.parse(startTime)
        ? [startTime, selectedTime.value.endTime]
        : [selectedTime.value.startTime, endTime]
    for (let i = 0; i < data.value.length; i++) {
      const {
        startTime: time1,
        endTime: time2,
        skkud,
        skkuding
      } = data.value[i]
      if (
        Date.parse(time1) >= Date.parse(start) &&
        Date.parse(time2) <= Date.parse(end) &&
        !canSelect(skkud + skkuding)
      ) {
        return
      }
    }
    if (Date.parse(selectedTime.value.startTime) > Date.parse(startTime)) {
      selectedTime.value.startTime = startTime
    } else {
      selectedTime.value.endTime = endTime
    }
  }
}

// toast message
const { showToastMessage } = useToastMessage()
// post api
interface Request {
  creator: string
  startTime: string
  endTime: string
  purpose: string
  members: string[]
  club: 'skkuding' | 'skkud'
}
interface Response extends Request {
  id: number
}
const postReservation = async () => {
  try {
    reservation.value.members.push(reservation.value.creator)
    const payload: Request = {
      ...reservation.value,
      club: reservation.value.club === 'SKKUDING' ? 'skkuding' : 'skkud'
    }
    const { data } = await axios.post<Response>('/api/reservation', payload)
    store.reset()
    await router.push(`/${data.startTime.split('.')[0]}`)
    showToastMessage('예약이 완료되었습니다!')
  } catch (e) {
    console.log(e)
  }
}

// modal form
const showModal = ref(false)
const inputMessage = ref({
  purpose: '',
  members: ['']
})
onBeforeMount(() => {
  if (reservation.value.memberCnt === '') {
    router.push('/')
  } else {
    reservation.value.members = store.initializeMembers()
    inputMessage.value.members = store.initializeMembers()
  }
})
const onClickCreateButton = async () => {
  reservation.value.startTime = selectedTime.value.startTime.replace('Z', '')
  reservation.value.endTime = selectedTime.value.endTime.replace('Z', '')
  if (editModal.value) {
    editInfo.value.startTime = selectedTime.value.startTime
    editInfo.value.endTime = selectedTime.value.endTime
    console.log(editInfo.value)
    router.push(`/${reservation.value.startTime.split('.')[0]}`)
  } else {
    if (Number(reservation.value.memberCnt) === 1) {
      await postReservation()
    } else {
      showModal.value = true
    }
  }
}
const onCancel = () => {
  reservation.value.purpose = ''
  reservation.value.members = store.initializeMembers()
  inputMessage.value = {
    purpose: '',
    members: store.initializeMembers()
  }
}
const onConfirm = async () => {
  inputMessage.value.purpose = store.validate('purpose')
  inputMessage.value.members = reservation.value.members.map((_, index) =>
    store.validate('members', index)
  )
  const pass = inputMessage.value.members.reduce(
    (pass, current) => pass && !current,
    true
  )
  if (inputMessage.value.purpose === '' && pass) {
    showModal.value = false
    await postReservation()
  }
}
const onClickResetButton = () => {
  selectedTime.value.startTime = ''
  selectedTime.value.endTime = ''
}
</script>

<template>
  <div class="select-wrapper" v-if="reservation.memberCnt !== ''">
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
    <Table :monday="monday">
      <template
        v-for="({ startTime, endTime, skkud, skkuding }, index) in data"
        :key="index"
        v-slot:[startTime]
      >
        <div
          v-if="canSelect(skkud + skkuding)"
          :class="isSelected(startTime, endTime) ? 'cell selected' : 'cell'"
          @click="selectTime(startTime, endTime)"
        />
        <div v-else class="cell disabled" />
      </template>
      <template v-slot:timeSelection="{ startTime, endTime }">
        <div
          :class="isSelected(startTime, endTime) ? 'cell selected' : 'cell'"
          @click="selectTime(startTime, endTime)"
        />
      </template>
    </Table>
    <div class="button-modal-wrapper">
      <Button color="red" @click="router.go(-1)">뒤로 가기</Button>
      <Button color="gray" @click="onClickResetButton">초기화</Button>
      <Button color="green" class="create-button" @click="onClickCreateButton">
        <IconPlus />
        생성
      </Button>
    </div>
    <Modal
      v-model="showModal"
      title="예약 상세 정보 입력"
      @cancel="onCancel"
      @confirm="onConfirm"
    >
      <form>
        <label>
          <span>모임이름</span>
          <TextInput
            placeholder="예시: SKKUDING 개발 회의"
            v-model="reservation.purpose"
            :message="inputMessage.purpose"
          />
        </label>
        <label>
          <span>
            참가자 이름
            <br />
            ({{ reservation.memberCnt }})
          </span>
          <div class="input-box">
            <p>{{ reservation.creator }}</p>
            <TextInput
              v-for="(_, index) in reservation.members"
              :key="index"
              v-model="reservation.members[index]"
              :message="inputMessage.members[index]"
            />
          </div>
        </label>
      </form>
    </Modal>
  </div>
</template>

<style scoped>
.select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 3rem 0 5rem;
}
.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button-wrapper > div {
  display: flex;
  align-items: center;
  gap: 1.5rem;
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
.cell {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.cell.disabled {
  background-color: v-bind('COLOR["light-gray"]');
  cursor: auto;
}
.cell.selected {
  background-color: v-bind('COLOR.green');
}
.button-modal-wrapper {
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 1rem;
}
.create-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}
label {
  display: flex;
  gap: 2rem;
}
label > .input-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label > span {
  flex-basis: 77px;
  text-align: center;
}
</style>
