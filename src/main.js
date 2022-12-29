import Vue from 'vue'
import App from './App.vue'
import VueProgressBar from 'vue-progressbar'
import OnLoad from 'vue-onload'
import VTooltip from 'v-tooltip'

require('./assets/css/theme.css')

Vue.config.productionTip = false

const options = {
  color: '#859398',
  failedColor: '#874b4b'
}

Vue.use(VueProgressBar, options)
Vue.use(OnLoad)
Vue.use(VTooltip)

new Vue({
  render: h => h(App),
}).$mount('#app')