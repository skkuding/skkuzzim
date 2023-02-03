<script setup lang="ts">
import Table from '@/components/Table.vue'
import Button from '@/components/Button.vue'
import TimeBlock from '@/components/TimeBlock.vue'
import TextInput from '@/components/TextInput.vue'
import RadioGroup from '@/components/RadioGroup.vue'
import Modal from '@/components/Modal.vue'
import IconChevronLeft from '~icons/fa6-solid/chevron-left'
import IconChevronRight from '~icons/fa6-solid/chevron-right'
import IconPlus from '~icons/fa6-solid/plus'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useDateFormat } from '@vueuse/core'
import { useReservationStore } from '@/stores/reservation'
import { storeToRefs } from 'pinia'
import { useReservationTable } from '@/hooks/useReservationTable'

const router = useRouter()
const { monday, data, weekHandler } = useReservationTable({ routing: true })

// header
const emit = defineEmits<{
  (e: 'dayTime', value: string): void
}>()
const dayTime = computed(() => useDateFormat(monday, 'YYYY년 M월').value)
emit('dayTime', dayTime.value)
watch(dayTime, (value) => {
  emit('dayTime', value)
})

// modal form
const showModal = ref(false)
const store = useReservationStore()
const { reservation } = storeToRefs(store)
const inputMessage = ref({
  creator: '',
  memberCnt: ''
})
const onCancel = () => {
  store.reset()
  inputMessage.value = {
    creator: '',
    memberCnt: ''
  }
}
const onConfirm = () => {
  inputMessage.value.creator = store.validate('creator')
  inputMessage.value.memberCnt = store.validate('memberCnt')
  if (
    inputMessage.value.creator === '' &&
    inputMessage.value.memberCnt === ''
  ) {
    showModal.value = false
    router.push('/select')
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
    <Table :monday="monday">
      <template
        v-for="({ startTime, skkuding, skkud, isFull }, index) in data"
        :key="index"
        v-slot:[startTime]
      >
        <RouterLink
          :to="`/${startTime.split('.')[0]}`"
          class="block-wrapper"
          v-if="isFull"
        >
          <TimeBlock :member="8" />
        </RouterLink>
        <RouterLink
          :to="`/${startTime.split('.')[0]}`"
          class="block-wrapper"
          v-else
        >
          <TimeBlock :member="skkuding" club="skkuding" v-if="skkuding !== 0" />
          <TimeBlock :member="skkud" club="skkud" v-if="skkud !== 0" />
        </RouterLink>
      </template>
    </Table>
    <Button color="green" class="create-button" @click="showModal = true">
      <IconPlus />
      생성
    </Button>
    <Modal
      v-model="showModal"
      title="예약자 정보 입력"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <form>
        <label>
          <span>이름</span>
          <TextInput
            v-model="reservation.creator"
            :message="inputMessage.creator"
          />
        </label>
        <label>
          <span>인원</span>
          <TextInput
            v-model="reservation.memberCnt"
            :message="inputMessage.memberCnt"
            placeholder="예약자 포함 인원"
          />
        </label>
        <label>
          <span>소속</span>
          <RadioGroup v-model="reservation.club" :values="store.clubs" />
        </label>
      </form>
    </Modal>
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
.create-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 2;
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
label > div {
  flex-grow: 1;
}
</style>
