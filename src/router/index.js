import Vue from 'vue'
import VueRouter from 'vue-router'
import Appliance from "@/router/appliance";

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'appliance',
  },

  ...Appliance
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
