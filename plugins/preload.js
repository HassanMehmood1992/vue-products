import Vue from "vue";
import moment from "moment";
import vueMoment from "vue-moment";
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import VueLodash from "vue-lodash";

import '@mdi/font/css/materialdesignicons.css'

Vue.prototype.$appURL = process.env.NUXT_ENV_ENVIRONMENT == 'production' ? process.env.NUXT_APP_URL : '/';

Vue.prototype.$imagesCDN = process.env.NUXT_ENV_IMG_CDN;

window.moment = moment;

Vue.use(vueMoment);
Vue.use(VueLodash);
Vue.component('vue-perfect-scrollbar', VuePerfectScrollbar);




