<template>
  <div id="app">
    <Header v-if="!error && !isEmpty(data.header)" :header='data.header'/>
    <Bio v-if="!isEmpty(data.views)" :bio='data.views.main.bio'/>
    <main v-if="!error && !isEmpty(data.views)">
      <Skills :skills='data.views.main.skills'/>
      <Education :education="data.views.main.education"/>
      <Contact :contact="data.views.main.contact"/>
    </main>
    <Footer v-if="!error && !isEmpty(data.footer)" :footer="data.footer"/>
    <FirebaseError v-if="error" />
    <LoadingIcon v-if="!error && isEmpty(data.views)"/>
    <vue-progress-bar/>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Bio from './components/Bio.vue'
  import Skills from './components/Skills.vue'
  import Education from './components/Education.vue'
  import Contact from './components/Contact.vue'
  import Footer from './components/Footer.vue'
  import FirebaseError from './components/FirebaseError.vue'
  import LoadingIcon from './components/LoadingIcon.vue'
  import { db } from './db'
  
  export default {
    name: 'App',
    components: {
      Header,
      Bio,
      Skills,
      Education,
      Contact,
      Footer,
      FirebaseError,
      LoadingIcon
    },
    data() {
      return {
        data: {
          header: {},
          views: {},
          footer: {}
        },
        error: false,
        promises: []
      }
    },
    methods: {
      isEmpty(obj) {
        return (Object.keys(obj).length === 0)
      }
    },
    created() {
      this.$Progress.start()
      
      const bgImgTop = document.createElement('img')
      const bgImgBottom = document.createElement('img')
      
      bgImgTop.src = require('@/assets/img/background-top.jpg')
      bgImgBottom.src = require('@/assets/img/background-bottom.jpg')
      
      this.promises.push(new Promise((resolve, reject) => {
        const result = {
          name: 'bgImgTop',
          src: bgImgTop.src
        }
        
        bgImgTop.addEventListener('load', function() {
          this.remove()
          resolve(result)
        })
        
        bgImgTop.addEventListener('error', function() {
          this.remove()
          reject(result)
        })
      }))
      
      this.promises.push(new Promise((resolve, reject) => {
        const result = {
          name: 'bgImgBottom',
          src: bgImgBottom.src
        }
      
        bgImgBottom.addEventListener('load', function() {
          this.remove()
          resolve(result)
        })
        
        bgImgBottom.addEventListener('error', function() {
          this.remove()
          reject(result)
        })
      }))
      
      this.promises.push(document.fonts.ready)
      
      this.promises.push(new Promise((resolve, reject) => {
        db.collection('app')
          .get()
          .then(snap => {
            if (snap.size > 0) {
              snap.forEach(doc => {
                this.data[doc.id] = doc.data()
              })
            } else {
              this.error = true
            }
            resolve(snap)
          })
          .catch(error => {
            this.error = true
            reject(error)
          })
      }))
      
      window.history.replaceState(null, null, window.location.pathname + location.hash)
    },
    mounted() {
      Promise.allSettled(this.promises)
        .then(results => {
          results.forEach(result => {
            if (!this.error && result.status === 'fulfilled' && result.value.name) {
              switch (result.value.name) {
                case 'bgImgTop':
                  document.body.style.setProperty('--background-image-top', `url(${result.value.src})`)
                  document.body.classList.add('bgImgTopLoaded')
                  break
                case 'bgImgBottom':
                  document.body.style.setProperty('--background-image-bottom', `url(${result.value.src})`)
                  document.body.classList.add('bgImgBottomLoaded')
                  break
              }
            }
          })
          this.$Progress.finish()
        })
    },
    updated() {
      const sectionEl = location.hash && document.querySelector(location.hash)
      if (sectionEl) {
        sectionEl.scrollIntoView()
      }
    }
  }
</script>

<style>
  #app {
    margin: 0 auto;
    padding: 2.5rem 1rem;
    max-width: 59.3rem;
  }
  
  main {
    padding: 3rem;
    background: rgb(var(--color-app-background));
    color: rgb(var(--color-app-text));
    border-radius: 1.25rem;
  }
  
  main > div:not(:last-of-type) {
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 0.06rem dashed rgb(var(--color-app-border));
  }
  
  .tooltip .tooltip-inner {
    padding: 0.313rem 0.5rem;
    border-radius: 0.313rem;
    font-size: 0.8rem;
  }
  
  .tooltip.white .tooltip-inner {
    background: rgba(var(--color-app-background), 0.95);
    color: rgb(var(--color-app-text));
  }
  
  .tooltip:not(.white) .tooltip-inner {
    background: rgba(var(--color-body-background), 0.95);
    color: rgb(var(--color-body-text));
  }
  
  .tooltip .tooltip-arrow {
    position: absolute;
    margin: 0.313rem;
    width: 0;
    height: 0;
    border-style: solid;
    z-index: 1;
  }
  
  .tooltip.white .tooltip-arrow {
    border-color: rgba(var(--color-app-background), 0.95);
  }
  
  .tooltip:not(.white) .tooltip-arrow {
    border-color: rgba(var(--color-body-background), 0.95);
  }
  
  .tooltip[x-placement^="top"] {
    margin-bottom: 0.5rem;
  }

  .tooltip[x-placement^="top"] .tooltip-arrow {
    bottom: -0.313rem;
    left: calc(50% - 0.313rem);
    margin-top: 0;
    margin-bottom: 0;
    border-width: 0.313rem 0.313rem 0 0.313rem;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
  }
  
  .tooltip[x-placement^="right"] {
    margin-left: 0.5rem;
  }

  .tooltip[x-placement^="right"] .tooltip-arrow {
    top: calc(50% - 0.313rem);
    left: -0.313rem;
    margin-left: 0;
    margin-right: 0;
    border-width: 0.313rem 0.313rem 0.313rem 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
  }
  
  .tooltip[x-placement^="bottom"] {
    margin-top: 0.5rem;
  }
  
  .tooltip[x-placement^="bottom"] .tooltip-arrow {
    top: -0.313rem;
    left: calc(50% - 0.313rem);
    margin-top: 0;
    margin-bottom: 0;
    border-width: 0 0.313rem 0.313rem 0.313rem;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
  }
  
  .tooltip[x-placement^="left"] {
    margin-right: 0.5rem;
  }

  .tooltip[x-placement^="left"] .tooltip-arrow {
    top: calc(50% - 0.313rem);
    right: -0.313rem;
    margin-left: 0;
    margin-right: 0;
    border-width: 0.313rem 0 0.313rem 0.313rem;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
  }
  
  .tooltip[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  
  .tooltip[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
  
  @media only screen and (max-width: 760px) {
    .tooltip {
      visibility: hidden !important;
    }
  }
</style>