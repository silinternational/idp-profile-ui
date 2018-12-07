<template>
  <div>
    <span class="body-2 pr-1">{{ name }}</span> {{ value }}
  </div>
</template>

<script>
export default {
  props: ['name', 'value']
}
</script>
