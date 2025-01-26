<template>
    <v-main>
        <div class="d-flex align-center justify-space-evenly ma-8">
            <div class="text-h5 font-weight-bold">Cart items</div>
            <div class="d-flex align-center justify-center ga-16">
                <div class="text-subtitle-1 font-weight-bold" >{{ 'Total: ' + total + ' RON'}}</div>
                <v-btn color="blue" variant="flat">Place order</v-btn>
            </div>
        </div>
        
        <v-container>
            <v-row v-for="item in items" :key="item.id" class="align-center">
                <v-divider></v-divider>
                <v-col cols="2">
                    <v-img :src="item.imageUrl" max-height="80px"></v-img>
                </v-col>
                <v-col cols="4">
                    <div class="text-subtitle-1">{{ item.brand + ' ' + item.name }}</div>
                    <div class="text-body-2">{{ item.type + ' | ' + item.category  }}</div>
                </v-col>
                <v-col cols="2" class="d-flex flex-column align-center justify-center ga-2">
                    <div class="text-body-2">{{ item.price * item.quantity }} RON</div>
                    <div class="d-flex align-center ga-4">
                        <v-btn icon="mdi-minus" color="grey-lighten-4" size="x-small" :disabled="item.quantity === 1" @click="handleDecreaseQuantity(item.id)"></v-btn>
                        <div class="text-body-2">{{ item.quantity }}</div>
                        <v-btn icon="mdi-plus" color="grey-lighten-4" size="x-small" :disabled="item.quantity === item.stock" @click="handleIncreaseQuantity(item.id)"></v-btn>
                    </div>
                </v-col>
                <v-col cols="2" class="d-flex align-center justify-center">
                    <v-btn color="red" variant="plain" @click="handleRemoveItem(item.id)">Remove</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({ 
            items: 'cart/getCartItems',
            total: 'cart/getTotalPrice'
        })
    },
    methods:{
        ...mapActions({ 
            increaseQuantity: 'cart/increaseQuantity',
            decreaseQuantity: 'cart/decreaseQuantity',
            removeItem: 'cart/removeItem'
        }),
        handleIncreaseQuantity(id) {
            this.increaseQuantity(id)
        },
        handleDecreaseQuantity(id) {
            this.decreaseQuantity(id)
        },
        handleRemoveItem(id) {
            this.removeItem(id)
        }
    }
}
</script>
