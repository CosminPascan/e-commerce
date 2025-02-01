<template>
    <v-app-bar class="px-16">
        <div v-if="!isAuthenticated" class="d-flex ml-auto">
            <v-btn to="/register" class="mx-4">Register</v-btn>
            <v-btn to="/login" class="mx-4">Login</v-btn>
        </div>
        <div v-if="isAuthenticated && $vuetify.display.mdAndUp" class="d-flex d-flex mr-auto">
            <v-btn to="/" class="mx-4">Shop</v-btn>
            <v-btn to="/cart" class="mx-4">Cart</v-btn>
            <v-btn to="/orders" class="mx-4">Orders</v-btn>
        </div>
        <div v-if="isAuthenticated" class="d-flex align-center ml-auto">
            <div class="text-subtitle-1 mx-4">Welcome, {{ username }}</div>
            <v-btn class="mx-4" color="red" variant="tonal" @click="handleLogout">Logout</v-btn>
        </div>
    </v-app-bar>
    <v-bottom-navigation v-if="isAuthenticated" class="d-md-none">
        <v-btn to="/">Shop</v-btn>
        <v-btn to="/cart">Cart</v-btn>
        <v-btn to="/orders">Orders</v-btn>
    </v-bottom-navigation>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'NavigationBar',
    computed: {
        ...mapGetters({
            username: 'account/getUsername',
            isAuthenticated: 'account/isAuthenticated'
        })
    },
    methods: {
        ...mapActions({ 
            logout: 'account/logout',
            emptyCart: 'cart/emptyCart'
        }),
        handleLogout() {
            this.logout()
            this.emptyCart()
        }
    }
}
</script>
