import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastMessage = defineStore('toastMessage', () => {
  const message = ref('')
  const showToastMessage = (msg: string) => {
    message.value = msg
    setTimeout(() => {
      message.value = ''
    }, 2000)
  }
  return {
    message,
    showToastMessage
  }
})
