<template>
    <v-main class="d-flex align-center justify-center bg-grey-lighten-3">
        <v-card class="pa-md-10 pa-2 rounded-lg elevation-8 w-75 w-md-50">
            <v-table height="60vh" fixed-header>
                <thead>
                    <tr>
                        <th class="text-md-h5 font-weight-bold">Order</th>
                        <th class="text-md-h5 font-weight-bold">Items</th>
                        <th class="text-md-h5 font-weight-bold text-right">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!orders.length">
                        <td>No orders placed!</td>
                    </tr>
                    <tr v-else v-for="order in orders" :key="order.id">
                        <td v-if="$vuetify.display.smAndUp">{{ order.id }}</td>
                        <td class="d-sm-none">{{ orders.indexOf(order) + 1 }}</td>
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
