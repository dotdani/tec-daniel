<template>
  <div id="contact" class="section">
    <SectionHeader :header="contact.header" anchor="contact"/>
    <form @submit.prevent="submitForm" ref="form">
      <ContactFormStatus v-if="status !== 'default'" :status="status" :message="form.status"/>
      <fieldset :disabled="!form.enabled">
        <label for="name">{{ form.name.label }}</label>
        <input type="text" id="name" v-model="name" @keyup="checkThis"/>
        <label for="email">{{ form.email.label }}</label>
        <input type="text" id="email" v-model="email" @keyup="checkThis"/>
        <label for="services">{{ form.services.label }}</label>
        <select id="services" v-model="currService">
          <option v-for="(service, key) in services" :key="key" :value="service">{{ service }}</option>
        </select>
        <label for="message">{{ form.message.label }}</label>
        <textarea id="message" rows="5" v-model="message" @keyup="checkThis"></textarea>
        <input type="submit" :value="form.button.label" :disabled="!dataIsValid || status === 'sending'"/>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import SectionHeader from './SectionHeader.vue'
  import ContactFormStatus from './ContactFormStatus.vue'
  import orderObj from '@/assets/js/commons.js'
  
  export default {
    name: 'Contact',
    components: {
      SectionHeader,
      ContactFormStatus
    },
    props: {
      contact: Object
    },
    data() {
      return {
        form: this.contact.form,
        name: '',
        email: '',
        services: null,
        currService: null,
        message: '',
        status: 'default',
        timeout: {
          'name': null,
          'email': null,
          'message': null
        },
        errors: {
          'name': true,
          'email': true,
          'message': true
        }
      }
    },
    computed: {
      dataIsValid() {
        return Object.values(this.errors).every(item => item === false)
      }
    },
    methods: {
      regExp(string) {
        const regParts = string.match(/^\/(.*?)\/([gim]*)$/)
        const regExp = regParts ? new RegExp(regParts[1], regParts[2]) : new RegExp(string)
        return regExp
      },
      checkForm() {
        return Object.values(this.errors).every(item => item === false)
      },
      checkThis(event) {
        const element = event.target
        
        element.setCustomValidity('')
        element.reportValidity()
        
        clearTimeout(this.timeout[element.id])
        
        this.timeout[element.id] = setTimeout(function () {
          const isValid = element.value.match(this.regExp(this.form[element.id].regEx))
          const message = !isValid ? this.form[element.id].errorMessage : ''
          this.errors[element.id] = !isValid
          element.setCustomValidity(message)
          element.reportValidity()
        }.bind(this), 1000)
      },
      submitForm() {
        if (this.form.enabled && this.dataIsValid) {
          this.status = 'sending'
          this.$refs.form.scrollIntoView()
          
          const formData = new URLSearchParams()
          formData.append('name', this.name)
          formData.append('email', this.email)
          formData.append('service', this.currService)
          formData.append('message', this.message)
          formData.append('formGoogleSheetName', 'tec-daniel')
          formData.append('formDataNameOrder', '["name","email","service","message"]')
          
          fetch(this.form.action, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
          })
          .then(response => response.json())
          .then(() => {
            this.name = ''
            this.email = ''
            this.currService = this.form.services.value[this.form.services.selected]
            this.message = ''
            this.status = 'success'
            Object.keys(this.errors).forEach(key => { this.errors[key] = true })
          })
          .catch(() => {
            this.status = 'error'
          })
          .finally(() => {
            setTimeout(function () {
              this.status = 'default'
            }.bind(this), 3000)
          })
        }
      }
    },
    created() {
      this.services = orderObj(this.form.services.value, this.form.services.order)
      this.currService = this.form.services.value[this.form.services.selected]
    },
    mounted() {
      if (!this.form.enabled) {
        this.status = 'warning'
      }
    }
  }
</script>

<style scoped>
  :invalid {
    border-color: red !important;
    outline: none;
  }
  
  fieldset {
    margin: 0;
    padding: 0;
    border: 0;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input,
  select,
  textarea {
    padding: 0.4rem;
    margin-bottom: 2rem;
    border: 0.06rem solid rgb(var(--color-app-border));
    border-radius: 0.3rem;
    background-color: rgb(var(--color-app-background));
    color: rgb(var(--color-app-text));
    font: inherit;
    box-shadow: none;
  }
  
  input[type="text"],
  input[type="email"],
  select {
    width: 100%;
    max-width: 37.5rem;
  }
  
  textarea {
    width: 100%;
  }
  
  input[type="submit"] {
    padding: 0.5rem 0.6rem;
    background-color: rgb(var(--color-btn-background));
    border: 0;
    border-radius: 0.3rem;
    color: rgb(var(--color-btn-text));
    outline: none;
  }
  
  input[type="submit"]:disabled {
    opacity: 0.5;
  }
  
  input[type="submit"]:not(:disabled):hover {
    background-color: rgb(var(--color-btn-background-hover));
  }
  
  input[type="submit"]:not(:disabled):active {
    background-color: rgb(var(--color-btn-background-active));
  }
</style>