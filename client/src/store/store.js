import { createStore } from 'vuex'

const store = createStore({
    state: {
        user: null,
        token: null,
        isAuthenticated: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
            if (token) {
                state.isAuthenticated = true
            } else {
                state.isAuthenticated = false
            }
        }
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        setToken({ commit }, token) {
            commit('setToken', token)
        }
    }
})

export default store
