import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Shop from '@/views/Shop.vue'
import Cart from '@/views/Cart.vue'
import PerfumesNew from '@/views/PerfumesNew.vue'
import PerfumesDetail from '@/views/PerfumesDetail.vue'

const routes = [
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/', component: Shop, meta: { requiresAuth: true } },
    { path: '/cart', component: Cart, meta: { requiresAuth: true } },
    { path: '/perfumes/new', component: PerfumesNew, meta: { requiresAuth: true } },
    { path: '/perfumes/:id', component: PerfumesDetail, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['account/isAuthenticated']

    if (isAuthenticated && (to.path === '/login' || to.path === '/register'))
        return next('/')

    if (!isAuthenticated && to.meta.requiresAuth) return next('/login')

    next()
})

export default router
