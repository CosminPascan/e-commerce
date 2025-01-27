import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import AccountModule from './modules/account'
import PerfumesModule from './modules/perfumes'
import CartModule from './modules/cart'
import OrdersModule from './modules/orders'

const store = createStore({
    modules: {
        account: AccountModule,
        perfumes: PerfumesModule,
        cart: CartModule,
        orders: OrdersModule
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            // paths: ['account'] - specifica ce module sa fie persistente
        })
    ]
})

export default store
