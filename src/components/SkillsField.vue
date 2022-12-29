<template>
  <div class="field">
    <div class="title">
      <Icon :icon="field.icon" />
      <h3>{{ field.title }}</h3>
    </div>
    <p class="description">
      {{ field.description }}
    </p>
    <div class="knowledge">
      <h4>{{ header.knowledgeTitle }}</h4>
      <ul>
        <li v-for="(knowledge, index) in knowledgeList" :key="index">
          <span v-tooltip.bottom="knowledge.progress < 100 && 'Dominio: ' + knowledge.progress + '%'">
            <span>{{ knowledge.label }}</span>
            <span :class="{ 'meter': true, 'hidden': knowledge.progress === 100 }">
              <span :style="{width: knowledge.progress + '%'}"></span>
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Icon from './Icon.vue'
  import orderObj from '@/assets/js/commons.js'
  
  export default {
    name: 'SkillsField',
    data () {
      return {
        knowledgeList: null
      }
    },
    props: {
      header: Object,
      field: Object
    },
    components: {
      Icon
    },
    created () {
      if ('knowledge' in this.field) {
        this.knowledgeList = orderObj(this.field.knowledge, this.field.knowledgeOrder)
      }
    }
  }
</script>

<style scoped>
  h3 {
    margin: 0;
    font-size: 1.1rem;
  }
  
  h4 {
    display: none;
    margin: 1rem 0;
  }
  
  .field {
    display: flex;
    align-items: center;
    margin: 2rem 0;
    width: 100%;
  }
  
  .field:last-of-type {
    margin-bottom: 0;
  }
  
  .title {
    flex: 0 1 11rem;
    text-align: center;
  }
  
  .description {
    flex: 1 1 20rem;
    margin: 0;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.3rem;
  }
  
  .knowledge {
    flex: 0 1 15rem;
    text-align: center;
  }
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
  
  li {
    display: inline-block;
    margin: 0 0 0.2rem 1rem;
  }
  
  li > span {
    display: flex;
    flex-direction: column;
  }
  
  .hidden {
    visibility: hidden;
  }
  
  .meter,
  .meter span {
    display: inline-block;
    height: 0.2rem !important;
    border-radius: 1rem;
    line-height: 0;
    font-size: 0;
  }
  
  .meter {
    width: 100%;
    background-color: rgb(var(--color-progress-bar));
    background: rgba(var(--color-progress-track), 0.5);
    text-align: left;
  }
  
  .meter span {
    background-color: rgb(var(--color-progress-bar));
  }
  
  .has-tooltip {
    cursor: default;
  }

  svg {
    font-size: 3em;
    color: rgb(var(--color-app-icon));
  }
  
  @media only screen and (max-width: 760px) {
    h3 {
      margin: 1rem 0;
    }
    
    h4 {
      display: block;
    }
    
    .field {
      flex-direction: column;
    }
    
    .field:not(:last-child) {
      margin: 0 0 2rem;
      padding-bottom: 2rem;
      border-bottom: 0.06rem solid rgb(var(--color-app-border));
    }
    
    .title,
    .description,
    .knowledge {
      flex: 1;
    }
    
    .description {
      margin: 1rem 0;
      padding: 0;
      text-align: center;
    }
    
    li > span {
      display: inline-flex;
    }
    
    li {
      display: block;
      margin-left: 0 !important;
    }
    
    .meter {
      visibility: hidden;
    }
  }
</style>