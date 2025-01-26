import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import AccountModule from './modules/account'
import PerfumesModule from './modules/perfumes'
import CartModule from './modules/cart'

const store = createStore({
    modules: {
        account: AccountModule,
        perfumes: PerfumesModule,
        cart: CartModule
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            // paths: ['account'] - specifica ce module sa fie persistente
        })
    ]
})

export default store
