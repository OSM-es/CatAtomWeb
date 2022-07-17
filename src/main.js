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
  faUpload,
  faSearch,
  faPaperPlane,
  faTimes,
  faUser,
  faUserPlus,
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import i18n from './services/i18n'

const app = createApp(App).use(i18n)

library.add(faAngleDown)
library.add(faCopy)
library.add(faDownload)
library.add(faExclamationTriangle)
library.add(faUpload)
library.add(faSearch)
library.add(faPaperPlane)
library.add(faTimes)
library.add(faUser)
library.add(faUserPlus)
library.add(faUserTimes)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.component('VSelect', vSelect)
app.use(router)
app.use(createPinia())
app.use(VueCollapsiblePanel)
app.use(SmartTable)
app.mount('#app')
