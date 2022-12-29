<template>
  <div v-if="fields" id="skills" class="section">
    <SectionHeader :header="skills.header" anchor="skills" />
    <SkillsField v-for="(field, index) in fields" :key="index" :field="field" :header="skills.header" />
  </div>
</template>

<script>
  import SectionHeader from './SectionHeader.vue'
  import SkillsField from './SkillsField.vue'
  import orderObj from '@/assets/js/commons.js'
  
  export default {
    name: 'Skills',
    components: {
      SectionHeader,
      SkillsField
    },
    props: {
      skills: Object
    },
    data () {
      return {
        fields: null
      }
    },
    created () {
      this.fields = orderObj(this.skills.fields, this.skills.fieldsOrder)
    }
  }
</script>