<template>
    <v-main class="d-flex align-center justify-center bg-grey-lighten-3">
        <v-card class="pa-10 rounded-lg elevation-8" width="50vw">
            <v-table height="60vh" fixed-header>
                <thead>
                    <tr>
                        <th class="text-h5 font-weight-bold">Order</th>
                        <th class="text-h5 font-weight-bold">Items</th>
                        <th class="text-h5 font-weight-bold text-right">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!orders.length">
                        <td>No orders placed!</td>
                    </tr>
                    <tr v-else v-for="order in orders" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>
                            <div v-for="item in order.items" :key="item.itemId" class="my-1">
                                {{ item.quantity + ' x ' + item.brand + ' ' + item.name }}
                            </div>
                        </td>
                        <td class="text-right">{{ order.totalPrice + ' RON' }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            orders: 'orders/getOrders',
            userId: 'account/getUserId'
        })
    },
    methods: {
        ...mapActions({
            fetchOrders: 'orders/fetchOrders'
        })
    },
    created() {
        this.fetchOrders(this.userId)
    }
}
</script>
