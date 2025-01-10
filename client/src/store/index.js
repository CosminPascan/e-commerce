import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import PerfumesModule from './modules/perfumes'
import AccountModule from './modules/account'

const store = createStore({
    modules: {
        account: AccountModule,
        perfumes: PerfumesModule
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            // paths: ['account']
        })
    ]
})

export default store
