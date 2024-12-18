<template>
  <BasePage>
    <template v-slot:header>
      {{ $t('pageNotFound.header') }}
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
