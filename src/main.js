import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import componentsPlugin from './components'
import directives from './directives'
import 'normalize.css'
import '@/styles/common.less'
createApp(App).use(store).use(router).use(componentsPlugin).use(directives).mount('#app')
