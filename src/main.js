require('@/assets/main.scss')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vSelect from 'vue-select'
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel'
import SmartTable from 'vuejs-smart-table'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faCopy,
  faDownload,
  faExclamationTriangle,
  faExternalLink,
  faUpload,
  faPaperPlane,
  faRepeat,
  faRunning,
  faShare,
  faSearch,
  faTimes,
  faTrash,
  faUser,
  faUserPlus,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import i18n from './services/i18n'

library.add(faAngleDown)
library.add(faCopy)
library.add(faDownload)
library.add(faExclamationTriangle)
library.add(faExternalLink)
library.add(faUpload)
library.add(faPaperPlane)
library.add(faRepeat)
library.add(faRunning)
library.add(faShare)
library.add(faSearch)
library.add(faTimes)
library.add(faTrash)
library.add(faUser)
library.add(faUserPlus)
library.add(faUserTimes)

const app = createApp(App).use(i18n)
app.config.globalProperties.$docUrl =
  'https://wiki.openstreetmap.org/wiki/ES:Catastro_espa%C3%B1ol/Importaci%C3%B3n_de_edificios/Gesti%C3%B3n_de_proyectos'
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('VSelect', vSelect)
app.use(router)
app.use(createPinia())
app.use(VueCollapsiblePanel)
app.use(SmartTable)
app.mount('#app')
