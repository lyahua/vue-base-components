import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/Home.vue'
import About from '../views/AboutView.vue'
import ScratchTicket from '../views/scratchTicket/index.vue'
import Clock from '../views/clock/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About,
      meta: {
        title: '关于'
      }
    },
    {
      path: '/scratchTicket',
      name: 'scratchTicket',
      component: ScratchTicket,
      meta: {
        title: '刮刮乐'
      }
    },
    {
      path: '/clock',
      name: 'Clock',
      component: Clock,
      meta: {
        title: '时钟'
      }
    },
  ],
})

console.log('router', router)
router.onError((error, to) => {
  const errors = ['Failed to fetch dynamically imported module', 'Unable to preload CSS'];

  if (errors.some((e) => error.message.includes(e))) {
    window.location = to.fullPath;
  }
});


export default router
