// eslint-disable-next-line no-undef
__webpack_public_path__ = window.zipUrl || "";

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
