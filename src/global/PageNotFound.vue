<template>
  <BasePage>
    <template v-slot:header>
      {{ $vuetify.lang.t('$vuetify.pageNotFound.header') }}
    </template>

    <img :src="questionImage" />
  </BasePage>
</template>

<script>
import questionImage from '@/assets/riddler-geeky-world.jpg'
export default {
  data: () => ({
    questionImage,
  }),
}
</script>
