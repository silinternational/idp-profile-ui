import { ref } from 'vue'

const password = ref('')

export function usePasswordStore() {
  function setPassword(newPassword) {
    password.value = newPassword
  }

  return {
    password,
    setPassword,
  }
}
