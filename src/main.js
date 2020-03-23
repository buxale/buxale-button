import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store/index'
import vueCustomElement from 'vue-custom-element'
import 'document-register-element/build/document-register-element'
import './assets/styles/index.css';

Vue.use(vueCustomElement)
// App.store = store
// App.router = router
Vue.customElement('buxale-button', App)