import axiosInstance from '@/api/axios'

export default {
    namespaced: true,
    state: {
        perfumes: []
    },
    getters: {
        getPerfumes: state => state.perfumes
    },
    mutations: {
        SET_PERFUMES(state, perfumes) {
            state.perfumes = perfumes
        }
    },
    actions: {
        async fetchPerfumes({ commit }) {
            try {
                const response = await axiosInstance.get('/perfumes')
                commit('SET_PERFUMES', response.data)
            } catch (error) {
                console.error(error.response.data.message)
            }
        }
    }
}
