<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Button from './Button.vue';
const modal = ref(false)
const modalRef = ref(null)

onClickOutside(
  modalRef,
  (event) => {
    console.log(event)
    modal.value = false
  },
)
defineProps<{
  title: string;
  content?: string;
}>()

</script>

<template>
  <button @click="modal = true">
    Open Modal
  </button>
  <div v-if="modal" ref="modalRef" class="modal">
    <div class="inner">
      <p class="heading">
        {{ title }}
      </p>
      <div id="content-container">
        <slot />
      </div>
      <div id="button-container">
        <Button color="red">취소</Button>
        <Button color="green">생성</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  z-index: 10;
}
.inner {
  background-color: white;
  padding: 24px 48px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 10px rgba(10, 10, 10, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.heading {
  font-weight: bold;
  font-size: 1.4rem;
}
#button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
#content-container {
  margin: 20px;
}
Button {
  margin: 0 15px;
}
</style>