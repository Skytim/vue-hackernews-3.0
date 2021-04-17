import { createRouter, createWebHashHistory } from 'vue-router'

const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const UserView = () => import('../views/UserView.vue');
const ItemView = () => import('../views/ItemView.vue');
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/top'
  },
  {

    name: 'Top',
    path: '/top/:page(\\d+)?', component: createListView('top')
  },
  {

    name: 'New',
    path: '/new/:page(\\d+)?', component: createListView('new')
  },
  {

    name: 'Show',
    path: '/show/:page(\\d+)?', component: createListView('show')
  },
  {

    name: 'Ask',
    path: '/ask/:page(\\d+)?', component: createListView('ask')
  },
  {

    name: 'Job',
    path: '/job/:page(\\d+)?', component: createListView('job')
  },
  { path: '/item/:id(\\d+)', component: ItemView },
  { path: '/user/:id', component: UserView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ y: 0 }),
  fallback: false
})

export default router
