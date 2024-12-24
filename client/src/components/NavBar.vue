<template>
    <v-app-bar class="px-16">
        <v-btn v-if="!$store.state.isAuthenticated" to="/register" class="mx-4">Register</v-btn>
        <v-btn v-if="!$store.state.isAuthenticated" to="/login" class="mx-4">Login</v-btn>
        <v-btn v-if="$store.state.isAuthenticated" to="/" class="mx-4">Home</v-btn>
        <v-btn v-if="$store.state.isAuthenticated" class="mx-4" color="red" variant="tonal" @click="logout">Logout</v-btn>
    </v-app-bar>
</template>

<script>
export default {
    name: 'NavigationBar',
    methods: {
        logout() {
            this.$store.dispatch('setUser', null)
            this.$store.dispatch('setToken', null)
            this.$router.push('/login')
        }
    }
}
</script>
