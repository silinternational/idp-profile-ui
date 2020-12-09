<template>
  <div v-if="sameline || sameline == ''">
    <span class="body-2 pr-2">{{ name }}</span>{{ value || '–' }}
  </div>
  <dl v-else>
    <dt class="body-2">{{ name }}</dt>
    <dt class="body-1 pl-6 py-2">{{ value || '–' }}</dt>
  </dl>
</template>

<script>
export default {
  props: [
    'name', 
    'value',
    'sameline'
  ]
}
</script>
