<script setup lang="ts">
import Button from '@/components/Button.vue'
import ListItem from '@/components/ListItem.vue'
import Modal from '@/components/Modal.vue'
// import MyComponent from '@/components/MyComponent.vue'
import { FONT_SIZE, COLOR } from '@/styles/theme'
import IconClock from '~icons/fa6-regular/clock'
import { computed, ref } from 'vue'
import { useDateFormat } from '@vueuse/core'

const props = defineProps<{
  id: string
}>()

// header
const emit = defineEmits<{
  (e: 'dayTime', value: string): void
}>()
let dayTime = computed(() => useDateFormat(props.id, 'M월 D일 HH:MM').value)
let test = new Date(props.id)
test.setTime(test.getTime() + 10 * 60 * 1000 * 30)
const endTime = computed(() => useDateFormat(test, ' ~ HH:MM').value)
let endVal = endTime.value
let dayVal = dayTime.value
let result = dayVal + endVal
console.log(result)

emit('dayTime', result)
// watch(dayTime, (value) => {
//   emit('dayTime', value)
// })

const editModal = ref(false)
const removeModal = ref(false)
const showEditModal = () => {
  console.log('editModal on')
  editModal.value = true
}
const showRemoveModal = () => {
  console.log('removeModal on')
  removeModal.value = true
}
const editApproval = () => {
  console.log('edit approved ')
}
const removeApproval = () => {
  console.log('removal approved ')
}
// const end = id.setMinutes(id.getMinutes() + 10)
</script>

<template>
  <!-- <div>상세 정보 페이지 입니다 : id = {{ id }}</div> -->
  <div id="detail-page-wrapper">
    <h1 class="detail-page-title">예약 상세 정보</h1>
    <div id="list-wrapper">
      <ListItem
        v-bind:item="{
          id: 1,
          creator: '김예시',
          club: 'skkuding',
          startTime: id,
          endTime: id,
          members: ['홍길동', '김철수']
        }"
        v-on:edit="showEditModal"
        v-on:remove="showRemoveModal"
      />
    </div>
    <Modal v-model="editModal" title="예약 정보 수정" @confirm="editApproval">
      <div class="row">
        <div>예약자 이름</div>
        <div>김예시</div>
      </div>
      <div class="row">
        <div>예약 시간</div>
        <div id="time">
          <IconClock id="icon-clock" />
          날짜 적는 곳
        </div>
      </div>
      <form></form>
    </Modal>
    <Modal
      v-model="removeModal"
      title="예약을 삭제하시겠습니까?"
      @confirm="removeApproval"
    ></Modal>
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
.detail-page-title {
  font-size: v-bind('FONT_SIZE.title');
  font-weight: bold;
}
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem;
  justify-content: flex-start;
  align-items: center;
}
.row > div:first-child {
  margin-right: 1rem;
  width: 7rem;
  text-align: center;
  padding: 0.2rem 0.8rem;
}
#time {
  border: 1px solid v-bind("COLOR['gray']");
  border-radius: 0.7rem;
  padding: 0.2rem 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
