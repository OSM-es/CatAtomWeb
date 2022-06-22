require("@/assets/main.scss");

import { createApp } from "vue";
import { createPinia } from "pinia";
import vSelect from "vue-select";
import VueCollapsiblePanel from "@dafcoe/vue-collapsible-panel";
import SmartTable from "vuejs-smart-table";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faCopy,
  faDownload,
  faExclamationTriangle,
  faUpload,
  faSearch,
  faPaperPlane,
  faTimes,
  faUser,
  faUserPlus,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

library.add(faAngleDown);
library.add(faCopy);
library.add(faDownload);
library.add(faExclamationTriangle);
library.add(faUpload);
library.add(faSearch);
library.add(faPaperPlane);
library.add(faTimes);
library.add(faUser);
library.add(faUserPlus);
library.add(faUserTimes);
app.config.globalProperties.$docUrl =
  "https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gesti%C3%B3n_de_proyectos";
app.component("font-awesome-icon", FontAwesomeIcon);
app.component("v-select", vSelect);
app.use(router);
app.use(createPinia());
app.use(VueCollapsiblePanel);
app.use(SmartTable);
app.mount("#app");
