<template>
  <v-progress-linear :indeterminate="loading > 0" color="secondary" height="10" bg-opacity="0" />
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import api from '@/plugins/api'

export default {
  name: 'LoadingIndicator',
  setup() {
    const loading = ref(0)
    const requestInterceptor = api.interceptors.request.use((config) => {
      loading.value++
      return config
    })

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        loading.value--
        return response
      },
      (error) => {
        loading.value--
        throw error
      },
    )

    onBeforeUnmount(() => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.response.eject(responseInterceptor)
    })

    return {
      loading,
    }
  },
}
</script>
