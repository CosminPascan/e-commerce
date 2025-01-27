export default {
    namespaced: true,
    state: {
        items: []
    },
    getters: {
        getCartItems: state => state.items,
        getTotalPrice: state => state.items.reduce((acc, i) => acc + (i.price * i.quantity), 0),
        isItemAvailable: state => itemId => {
            const item = state.items.find(i => i.id === itemId)
            if (item) return item.stock > item.quantity ? true : false
            return true 
        }
    },
    mutations:{
        ADD_TO_CART(state, item) {
            item.quantity = 1
            state.items.push(item)
        },
        REMOVE_ITEM(state, id) {
            state.items = state.items.filter(i => i.id !== id)
        },
        EMPTY_CART(state) {
            state.items = []
        },
        INCREASE_QUANTITY(state, id) {
            const cartItem = state.items.find(i => i.id === id)
            cartItem.quantity++
        },
        DECREASE_QUANTITY(state, id) {
            const cartItem = state.items.find(i => i.id === id)
            cartItem.quantity--
        }
    },
    actions: {
        addToCart({ state, commit }, item) {
            const cartItem = state.items.find(i => i.id === item.id)
            if (!cartItem) {
                commit('ADD_TO_CART', item)
            } else {
                commit('INCREASE_QUANTITY', item.id)
            }
        },
        removeItem({ commit}, id) {
            commit('REMOVE_ITEM', id)
        },
        increaseQuantity({ commit }, id) {
            commit('INCREASE_QUANTITY', id)
        },
        decreaseQuantity({ commit }, id) {
            commit('DECREASE_QUANTITY', id)
        },
        emptyCart({ commit }) {
            commit('EMPTY_CART')
        }
    }
}