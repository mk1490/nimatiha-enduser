import type {App} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import {routes} from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!!localStorage.getItem('Authorization')) {
    next()
  } else if (to.name != 'login') {
    next({name: 'login'})
  }
  next()


})

// router.afterEach((to, from, next) => {
//   // next({
//   //   to,
//   // })
// })

export default function (app: App) {
  app.use(router)
}


export {router}
