import axios from 'axios'
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBullseye, faWalking, faScroll, faTrophy, faArrowLeft, faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './routes'
import auth from './auth'
import VueFilterDateFormat from 'vue-filter-date-format';

Vue.use(VueFilterDateFormat);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

library.add(faBullseye, faWalking, faScroll,faTrophy, faArrowLeft, faEdit, faTrash, faCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.router = router;
Vue.use(VueRouter);

Vue.use(VueAxios, axios);
axios.defaults.baseURL = `${process.env.VUE_APP_API_URL}/api`;
Vue.use(VueAuth, auth);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
