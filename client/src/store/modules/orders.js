import axiosInstance from "@/api/axios"

export default {
    namespaced: true,
    state: {
        orders: []
    },
    getters: {
        getOrders: state => state.orders
    },
    mutations:{
        SET_ORDERS(state, orders) {
            state.orders = orders
        }
    },
    actions: {
        async fetchOrders({ commit }, userId) {
            try {
                const response = await axiosInstance.get(`/orders/${userId}`)
                commit('SET_ORDERS', response.data)
            } catch (error) {
                console.error(error.response.data.message)
            }
        },
        async placeOrder({ commit }, order) {
            try {
                await axiosInstance.post('/orders', order)
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
    }
}