import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({
      x: 0,
      y: 0
    }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    const requiresAuth = to.meta.requiresAuth
    const guest = to.meta.guest
    console.log(requiresAuth)
    console.log(guest)
    if (requiresAuth && !guest) {
      if (token) {
        axios.post('http://localhost:3000/auth/varify', null, {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          console.log('response', res)
          if (res.data.auth === false) {
            next({
              name: 'login'
            })
          } else {
            next()
          }
        }).catch((error) => {
          console.log('error', error)
          // error action
        })
      } else {
        console.log('Here')
        next({
          name: 'login'
        })
      }
    } else {
      next()
    }
  })

  return Router
}
