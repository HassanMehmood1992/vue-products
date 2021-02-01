// ./test/jest.setup.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import VueLodash from "vue-lodash";
import lodash from 'lodash';


import VuePerfectScrollbar from 'vue-perfect-scrollbar';
Vue.component('vue-perfect-scrollbar', VuePerfectScrollbar);
Vue.use(VueLodash, { lodash: lodash });
Vue.use(Vuetify)
