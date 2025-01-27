import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Shop from '@/views/Shop.vue'
import Cart from '@/views/Cart.vue'
import Orders from '@/views/Orders.vue'
import PerfumesNew from '@/views/PerfumesNew.vue'
import PerfumesDetail from '@/views/PerfumesDetail.vue'

const routes = [
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/', component: Shop, meta: { requiresAuth: true } },
    { path: '/cart', component: Cart, meta: { requiresAuth: true } },
    { path: '/orders', component: Orders, meta: { requiresAuth: true } },
    { path: '/perfumes/new', component: PerfumesNew, meta: { requiresAuth: true, role: 'admin' } },
    { path: '/perfumes/:id', component: PerfumesDetail, meta: { requiresAuth: true, role: 'admin' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['account/isAuthenticated']
    const role = store.getters['account/getUserRole']

    if (isAuthenticated && (to.path === '/login' || to.path === '/register'))
        return next('/')

    if (!isAuthenticated && to.meta.requiresAuth) return next('/login')

    if (to.meta.role && to.meta.role !== role) return next('/')

    next()
})

export default router
