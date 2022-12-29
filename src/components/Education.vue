<template>
  <div id="education" class="section">
    <SectionHeader :header="education.header" anchor="education"/>
    <ul>
      <li v-for="(degree, key) in degrees" :key="key">
        <Icon :icon="education.icon"/>
        <p>{{ degree.title }}</p>
        <p>{{ degree.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import SectionHeader from './SectionHeader.vue'
  import Icon from './Icon.vue'
  import orderObj from '@/assets/js/commons.js'
  
  export default {
    name: 'Education',
    components: {
      SectionHeader,
      Icon
    },
    props: {
      education: Object
    },
    data () {
      return {
        degrees: null
      }
    },
    created() {
      this.degrees = orderObj(this.education.degrees, this.education.degreesOrder)
    }
  }
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-areas: "icon title" "icon description";
  }
  
  svg {
    grid-area: icon;
    margin-right: 0.5rem;
    padding-top: 0.15rem;
    font-size: 1.2rem;
  }
  
  li > p:first-of-type {
    grid-area: title;
    margin: 0;
    font-weight: bold;
  }
  
  li > p:last-of-type {
    grid-area: description;
    margin-top: 0.5rem;
  }
</style>