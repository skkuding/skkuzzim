<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Button from './Button.vue';
import { FONT_SIZE } from '@/styles/theme'
const show = ref(false)
const modalRef = ref(null)

onClickOutside(
  modalRef,
  (event) => {
    show.value = false
  },
)
defineProps<{
  title: string;
}>()

</script>

<template>
  <div v-if="show" class="modal">
    <div class="inner" ref="modalRef">
      <h1 class="heading">
        {{ title }}
      </h1>
      <slot />
      <div id="button-wrapper">
        <Button color="red">취소</Button>
        <Button color="green">생성</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 425px;
}
.heading {
  font-weight: bold;
  font-size: v-bind("FONT_SIZE.title");
}
#button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
Button {
  margin: 0 15px;
}
</style>