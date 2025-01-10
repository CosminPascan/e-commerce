import { createRouter, createWebHistory } from 'vue-router'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Shop from '@/views/Shop.vue'
import store from '@/store'

const routes = [
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/shop', component: Shop, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['account/isAuthenticated']

    if (isAuthenticated && (to.path === '/login' || to.path === '/register')) return next('/shop')

    if (!isAuthenticated && to.meta.requiresAuth) return next('/login')

    next()
})

export default router
