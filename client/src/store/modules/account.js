import axiosInstance from '@/api/axios'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        user: null,
        authenticated: false,
        role: null
    },
    getters: {
        getUsername: state => state.user ? state.user.username : null,
        getUserId: state => state.user ? state.user.id : null,
        getUserRole: state => state.user? state.user.role : null,
        isAuthenticated: state => state.authenticated
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            if (user) {
                state.authenticated = true
            } else {
                state.authenticated = false
            }
        }
    },
    actions: {
        async login({ commit }, user) {
            try {
                const response = await axiosInstance.post('/login', user)
                commit('SET_USER', response.data.user)
                router.push('/')
            } catch (error) {
                console.error(error.response.data.message)
            }
        },
        logout({ commit }) {
            commit('SET_USER', null)
            sessionStorage.clear()
            router.push('/login')
        }
    }
}
