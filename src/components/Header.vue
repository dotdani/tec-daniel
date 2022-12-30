<template>
  <header>
    <a href="/" @click.prevent="toggler = !toggler" v-tooltip="{content: 'Ampliar imagen', classes: 'white'}" id="photo">
      <img alt="Fotografía de perfil" v-onload="header.avatarFilePath"/>
    </a>
    <div id="title">
      <h1>{{ header.title }}</h1>
      <p><Icon :icon="header.professionIcon"/> {{ header.profession }}</p>
      <p><Icon :icon="header.locationIcon"/> {{ header.location }}</p>
    </div>
    <FsLightbox :toggler="toggler" :sources="[header.avatarFilePathFullSize]"/>
  </header>
</template>

<script>
  import Icon from './Icon.vue'
  import FsLightbox from 'fslightbox-vue'
  
  export default {
    name: 'Header',
    components: {
      Icon,
      FsLightbox
    },
    props: {
      header: Object
    },
    data() {
      return {
        toggler: false
      }
    }
  }
</script>

<style scoped>
  header {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 2.5rem;
  }
  
  #photo {
    display: inline-block;
    background-color: rgb(var(--color-app-icon));
  }
  
  #photo, img {
    width: 8.8rem;
    height: 8.8rem;
    border-radius: 50%;
  }
  
  img {
    border: 0;
    opacity: 1;
    transition: opacity 0.3s ease-out;
    cursor: zoom-in;
  }
  
  img[data-src] {
    opacity: 0;
  }
  
  h1, p {
    margin: 0;
  }
  
  h1 {
    font-size: 2.4rem;
  }
  
  p:last-of-type {
    font-size: 0.8rem;
  }
  
  svg {
    width: 0.9rem !important;
    text-align: center;
  }
  
  #title {
    margin-left: 1rem;
  }
  
  @media only screen and (max-width: 760px) {
    header {
      display: block;
      text-align: center;
    }
    
    #photo {
      margin-bottom: 1rem;
    }
    
    #photo, img {
      width: 10rem;
      height: 10rem;
    }
    
    #title {
      margin-left: 0;
    }
  }
</style>