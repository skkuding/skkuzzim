<script setup lang="ts">
import Button from '@/components/Button.vue'
import ListItem from '@/components/ListItem.vue'
import Modal from '@/components/Modal.vue'
// import MyComponent from '@/components/MyComponent.vue'
import { FONT_SIZE, COLOR } from '@/styles/theme'
import IconClock from '~icons/fa6-regular/clock'
import { computed, onMounted, ref, type Ref } from 'vue'
import { useDateFormat } from '@vueuse/core'
import Toast from '@/components/Toast.vue'
import { useEditStore } from '@/stores/reservation'
import { useReservationStore } from '@/stores/reservation'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import MemberTextInput from '@/components/MemberTextInput.vue'
import TextInput from '@/components/TextInput.vue'
import RadioGroup from '@/components/RadioGroup.vue'
import IconPlus from '~icons/fa6-solid/plus'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import axios from 'axios'
import { useModalStore } from '@/stores/modal'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.locale('ko')
const router = useRouter()

type Item = {
  id: number
  creator: string
  club: 'skkuding' | 'skkud'
  startTime: string
  endTime: string
  members: string[]
  purpose: string
}

const props = defineProps<{
  id: string
}>()

let data = ref<Item[]>([
  {
    id: 0,
    creator: '김예시',
    purpose: 'SKKUDING 개발 회의',
    club: 'skkuding',
    startTime: '',
    endTime: '',
    members: ['김예시', '홍길동', '김철수']
  },
  {
    id: 1,
    creator: '강금비',
    purpose: '토이 프로젝트',
    startTime: '',
    endTime: '',
    club: 'skkud',
    members: ['강금비', '조무지']
  }
])
// header
const emit = defineEmits<{
  (e: 'dayTime', value: string): void
}>()
let dayTime = computed(() => useDateFormat(props.id, 'M월 D일 HH:mm').value)

let test = dayjs(props.id).add(30, 'minute').utc().format()
let apiRequest = dayjs(props.id).add(570, 'minute').utc().format()
let editTime = ref('')

onMounted(() => {
  axios
    .get(`/api/reservation/detail?startTime=${props.id}&endTime=${apiRequest}`)
    .then((res) => {
      data.value = res.data.data
      for (let i = 0; i < data.value.length; i++) {
        data.value[i].startTime = data.value[i].startTime.replace('Z', '')
        data.value[i].endTime = data.value[i].endTime.replace('Z', '')
      }
    })
    .catch((err) => console.log('error is ', err))
  let sTime = computed(
    () =>
      useDateFormat(
        editInfo.value.startTime,
        dayjs(editInfo.value.startTime).format('M/D(ddd) HH:mm')
      ).value
  )
  let eTime = computed(
    () => useDateFormat(editInfo.value.endTime, ' ~ HH:mm').value
  )
  editTime.value = sTime.value + eTime.value
})
const endTime = computed(() => useDateFormat(test, ' ~ HH:mm').value)
let result = dayTime.value + endTime.value

emit('dayTime', result)

const store = useEditStore()
const modalStore = useModalStore()
const reservationStore = useReservationStore()
const { editInfo } = storeToRefs(store)
const { editModal } = storeToRefs(modalStore)
const { reservation } = storeToRefs(reservationStore)
const inputMessage = ref({
  purpose: '',
  members: ['']
})

const removeModal = ref(false)
const editToast = ref(false)
const deleteToast = ref(false)

const showEditModal = (e: number) => {
  editInfo.value = {
    ...data.value[e],
    members: [...data.value[e].members]
  }
  let sTime = computed(
    () =>
      useDateFormat(
        editInfo.value.startTime,
        dayjs(editInfo.value.startTime).format('M/D(ddd) HH:mm')
      ).value
  )
  let eTime = computed(
    () => useDateFormat(editInfo.value.endTime, ' ~ HH:mm').value
  )
  editTime.value = sTime.value + eTime.value
  editModal.value = true
}

const showRemoveModal = () => {
  removeModal.value = true
}

const editApproval = (e: number) => {
  inputMessage.value.purpose = store.validateEdit('purpose')
  for (let i = 0; i < editInfo.value.members.length; i++) {
    inputMessage.value.members[i] = store.validateEdit('members', i)
    if (inputMessage.value.members[i] !== '') {
      return
    }
  }
  if (inputMessage.value.purpose === '') {
    editInfo.value.startTime = dayjs(editInfo.value.startTime)
      .subtract(9, 'hour')
      .utc()
      .format()
    editInfo.value.endTime = dayjs(editInfo.value.endTime)
      .subtract(9, 'hour')
      .utc()
      .format()
    console.log('editInfo is ', editInfo)
    axios.patch(`/api/reservation/${e}`, editInfo.value)
    editModal.value = false
    editToast.value = true
    setTimeout(() => {
      editToast.value = false
      router.push(`/${editInfo.value.startTime.split('.')[0]}`)
    }, 1000)
  }
}

const cancelEdit = () => {
  store.resetEdit()
  inputMessage.value = {
    purpose: '',
    members: ['']
  }
}

const removeApproval = (e: number) => {
  axios
    .delete(`/api/reservation/${e}`)
    .then((res) => console.log(res))
    .catch((err) => console.log('error is ', err))
  removeModal.value = false
  deleteToast.value = true
  setTimeout(() => {
    deleteToast.value = false
  }, 1000)
}

const editAddHandler = () => {
  editInfo.value.members.push('')
}
const deleteHandler = (e: number) => {
  editInfo.value.members.splice(e, 1)
}
const editTimeHandler = () => {
  reservation.value.memberCnt = editInfo.value.members.length.toString()
  console.log(reservation.value.members)
  router.push('/select')
}
</script>

<template>
  <div id="detail-page-wrapper">
    <h1 class="detail-page-title">예약 상세 정보</h1>
    <div id="list-wrapper">
      <ListItem
        v-for="(
          { id, creator, club, purpose, startTime, endTime, members }, index
        ) in data"
        :key="index"
        :item="{
          id,
          purpose,
          creator,
          club,
          startTime,
          endTime,
          members
        }"
        v-on:edit="showEditModal(index)"
        v-on:remove="showRemoveModal"
        class="list-item"
      ></ListItem>
    </div>
    <Modal
      v-model="editModal"
      title="예약 정보 수정"
      @confirm="editApproval(editInfo.id)"
      @cancel="cancelEdit"
    >
      <div class="row">
        <div>예약자 이름</div>
        <div>{{ editInfo.creator }}</div>
      </div>
      <div class="row">
        <div>예약 시간</div>
        <div id="time" @click="editTimeHandler()">
          <IconClock id="icon-clock" />
          {{ editTime }}
        </div>
      </div>
      <form>
        <div class="row">
          <div>소속</div>
          <RadioGroup v-model="editInfo.club" :values="store.clubs" />
        </div>
        <div class="row">
          <div>모임 이름</div>
          <TextInput
            v-model="editInfo.purpose"
            :message="inputMessage.purpose"
            placeholder="모임 이름을 입력하세요"
          />
        </div>
        <div class="row members">
          <div>참가자 이름</div>
          <div class="name-list-wrapper">
            <div>{{ editInfo.creator }}</div>
            <div
              class="member-input"
              v-for="(e, index) in editInfo.members.length"
              :key="index"
            >
              <MemberTextInput
                class="member-text-input"
                v-model="editInfo.members[index]"
                v-if="editInfo.members[index] !== editInfo.creator"
                placeholder="멤버 이름을 입력하세요"
                :message="inputMessage.members[index]"
                @cancel="deleteHandler(index)"
              />
            </div>
            <Button
              color="white"
              class="add-button"
              @click.prevent="editAddHandler"
            >
              <IconPlus class="icon" />
              추가
            </Button>
          </div>
        </div>
      </form>
    </Modal>
    <Modal
      v-model="removeModal"
      title="예약을 삭제하시겠습니까?"
      @confirm="removeApproval(editInfo.id)"
    ></Modal>
    <Transition>
      <Toast msg="수정이 완료되었습니다" v-if="editToast" />
    </Transition>
    <Transition>
      <Toast msg="삭제가 완료되었습니다" v-if="deleteToast" />
    </Transition>
    <div id="button-wrapper">
      <RouterLink :to="`/`">
        <Button color="red">돌아가기</Button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
#detail-page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
}
.list-item {
  margin: 1rem 0;
}
.detail-page-title {
  font-size: v-bind('FONT_SIZE.title');
  font-weight: bold;
}
.icon {
  font-size: v-bind('FONT_SIZE.content');
}

.v-enter-active {
  transition: opacity 0.1s ease;
}
.v-leave-active {
  transition: opacity 1s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem;
  justify-content: flex-start;
  align-items: flex-start;
}
.row > div:first-child {
  margin-right: 1rem;
  width: 7rem;
  text-align: center;
  padding: 0.2rem 0.8rem;
}
.member-input {
  display: flex;
  flex-direction: column;
}
.member-text-input {
  margin: 0.3rem 0;
}
#time {
  border: 1px solid v-bind("COLOR['gray']");
  border-radius: 0.7rem;
  padding: 0.2rem 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 215px;
}
#icon-clock {
  margin-right: 0.4rem;
}

#list-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3rem 5rem;
}
#button-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.add-button {
  margin-top: 10px;
}
</style>
