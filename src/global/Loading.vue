<template>
  <v-progress-linear :indeterminate="!!loading" color="secondary" height="10" background-opacity="0" />
</template>

<script>
export default {
  data: () => ({
    loading: 0
  }),
  beforeCreate() {
    this.$API.interceptors.request.use(config => {
      this.loading++

      return config
    })

    this.$API.interceptors.response.use(
      response => {
        this.loading--

        return response
      },
      error => {
        this.loading--

        throw error
      }
    )
  }
}
</script>
