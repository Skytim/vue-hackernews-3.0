import { createRouter, createWebHashHistory } from 'vue-router'

const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/top'
  },
  {

    name: 'Top',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    path: '/top/:page(\\d+)?', component: createListView('top')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ y: 0 }),
  fallback: false
})

export default router
