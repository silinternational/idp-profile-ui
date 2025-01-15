<template>
  <div v-if="sameline">
    <span class="text-body-2 pr-2">{{ name }}</span>
    {{ value || '–' }}
  </div>
  <dl v-else>
    <dt class="text-body-2">{{ name }}</dt>
    <dt class="text-body-1 pl-6 py-2">{{ value || '–' }}</dt>
  </dl>
</template>

<script>
export default {
  name: 'ProfileAttribute',
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    sameline: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
