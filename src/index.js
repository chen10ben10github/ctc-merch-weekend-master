import { createRouter, createWebHistory } from 'vue-router'

import AboutPage from './view/aboutpage.vue'
import HomePage from './view/homepage.vue'
import NotFoundView from './view/notfoundview.vue'
import ShopPage from './view/shoppage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    { path: '/shop', component: ShopPage },
    { path: '/about', component: AboutPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
