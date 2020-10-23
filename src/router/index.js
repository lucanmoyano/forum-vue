import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import ForoEditor from '../views/ForoEditor.vue'
import ForoInfo from '../views/ForoInfo.vue'
import ForoData from '../views/ForoData.vue'
import ForoEdit from '../views/ForoEdit.vue'

Vue.use(VueRouter)

  const routes = [
  //{
  //  path: '/',
  //  name: 'Home',
  //  component: Home
  //},
  //{
    // path: '/about',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/editor',
    name: 'ForoEditor',
    component: ForoEditor
  },
  {
    path: '/hilos',
    name: 'ForoInfo',
    component: ForoInfo
  },
  {
    path: '/hilos/:id',
    name: 'ForoData',
    component: ForoData
  },
  {
    path: '/hilos/edit/:id',
    name: 'ForoEdit',
    component: ForoEdit
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
