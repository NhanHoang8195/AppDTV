import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(VueFire);
new Vue({
  el: '#app',
  render: h => h(App)
})
