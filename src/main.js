import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
sync(store, router)


function getTitle(vm) {
    const { title } = vm.$options
    if (title) {
        return typeof title === 'function'
            ? title.call(vm)
            : title
    }
}

const myMixin = {
    mounted() {
        const title = getTitle(this);
        if (title) {
            document.title = `Vue HN 3.0 | ${title}`
        }
    },
}

let app = createApp(App).mixin(myMixin);
app.config.globalProperties.$filters = {
    host(url) {
        const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
        const parts = host.split('.').slice(-3)
        if (parts[0] === 'www') parts.shift()
        return parts.join('.')
    },
    timeAgo(time) {
        const between = Date.now() / 1000 - Number(time)
        if (between < 3600) {
            return pluralize(~~(between / 60), ' minute')
        } else if (between < 86400) {
            return pluralize(~~(between / 3600), ' hour')
        } else {
            return pluralize(~~(between / 86400), ' day')
        }
    },
}
function pluralize(time, label) {
    if (time === 1) {
        return time + label
    }
    return time + label + 's'
}
app.use(store).use(router).mount('#app')
