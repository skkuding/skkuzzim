import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('editModal', () => {
  const editModal = ref(false)
  return { editModal }
})
