<script setup lang="ts">
import Button from '@/components/Button.vue'
import ListItem from '@/components/ListItem.vue'
// import MyComponent from '@/components/MyComponent.vue'
import { FONT_SIZE } from '@/styles/theme'

defineProps<{
  id: string
}>()
var date = new Date() // test
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
          startTime: date,
          endTime: date,
          members: ['홍길동', '김철수']
        }"
      />
      <!-- <MyComponent /> -->
    </div>
    <div id="button-wrapper">
      <Button color="red">돌아가기</Button>
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
