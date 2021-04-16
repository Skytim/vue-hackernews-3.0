import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
sync(store,router)
createApp(App).use(store).use(router).mount('#app')
