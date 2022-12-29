<template>
  <div id="bio">
    <h4>{{ bio.title }}</h4>
    <p>{{ bio.body }}</p>
  </div>
</template>

<script>
  export default {
    name: 'Bio',
    props: {
      bio: Object
    }
  }
</script>

<style scoped>
  #bio {
    margin: 0 auto 3rem;
    padding: 0 1rem;
    max-width: 40.6rem;
    text-align: center;
  }
  
  h4 {
    margin: 0 0 1.5rem 0;
    font-size: 1.4rem;
  }
</style>