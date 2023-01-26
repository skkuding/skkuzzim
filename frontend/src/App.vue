<script setup lang="ts">
// write script code
import Modal from './components/Modal.vue'
</script>

<template>
  <!-- TODO: 헤더 컴포넌트 추가 -->
  <Modal title="예약자 정보 수정">
    <div id="modal-content-test">
      <!-- slot에 임시로 넣어둔 content -->
      <div>
        <label for="name">예약자 이름</label>
        <input v-model="name" placeholder="name" />
      </div>
      <div>
        <label for="people">인원</label>
        <input v-model="people" placeholder="people" />
      </div>
    </div>
  </Modal>
  <main class="wrapper">
    <router-view />
  </main>
</template>

<style scoped>
.wrapper {
  width: 100%;
  max-width: 80rem;
  padding-left: 5rem;
  padding-right: 5rem;
}
#modal-content-test {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
