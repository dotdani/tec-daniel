<template>
  <svg v-html="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  </svg>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      icon: String
    }
  }
</script>

<style scoped>
  svg {
    width: 1em;
    font-size: inherit;
    vertical-align: middle;
  }
</style>