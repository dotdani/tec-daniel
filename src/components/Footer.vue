<template>
  <footer>
    <a href="/" title="Ir a la página principal">
      <span>
        <Icon :icon="footer.site.logo"/>
        <span>{{ footer.site.name }}</span>
      </span>
    </a>
    <div v-if="links.length">
        <a v-for="(link, index) in links" :key="index" :href="link.url" :title="'Visitar «' + link.title + '»'" target="_blank">
          <Icon :icon="link.icon"/>
        </a>
    </div>
  </footer>
</template>

<script>
  import Icon from './Icon.vue'
  import orderObj from '@/assets/js/commons.js'
  
  export default {
    name: 'Footer',
    components: {
      Icon
    },
    props: {
      footer: Object
    },
    data () {
      return {
        links: null
      }
    },
    created() {
      this.links = orderObj(this.footer.social.links, this.footer.social.linksOrder)
    }
  }
</script>

<style scoped>
  footer, div, span {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  
  footer {
    justify-content: center;
    gap: 1rem;
    margin-top: 2.5rem;
  }
  
  div {
    padding-left: 1rem;
    border-left: 0.03rem solid rgb(var(--color-body-link));
  }
  
  div, span {
    gap: 0.5rem;
  }
  
  svg {
    font-size: 2rem;
    fill: rgb(var(--color-body-link));
  }
</style>