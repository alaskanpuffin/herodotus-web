import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/add',
    name: 'AddContent',
    component: () => import('../views/AddContent.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/content/:id',
    name: 'ViewContent',
    props: true,
    component: () => import('../views/ViewContent.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditContent',
    props: true,
    component: () => import('../views/EditContent.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    children: [
      {
        path: 'general',
        component: () => import('../views/GeneralSettings.vue')
      },
      {
        path: 'users',
        component: () => import('../views/UserSettings.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
