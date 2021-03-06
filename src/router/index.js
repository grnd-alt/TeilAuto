import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import pagenotfound from '../components/pagenotfound.vue'
import fileupload from '../components/fileupload.vue'
import Projects from '../components/Projects.vue'
import Developer from '../components/Developer.vue'

Vue.use(VueRouter)
const routes = [
  {
    path:'*',
    name:'*',
    component:pagenotfound
  },
  {
    path:'',
    name:'home',
    component:Developer,
  },
  {
    path: '/Projects/TeilAuto',
    name: 'fileupload',
    component: fileupload
  },
  {
    path:'/Projects',
    name:'Projects',
    component:Projects
  },
  {
  path:'/Developer',
  name:'Developer',
  component:Developer,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode:"history",
  routes:routes,
})

export default router
