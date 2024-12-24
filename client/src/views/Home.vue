<template>
    <v-main>
        <div v-if="$store.state.isAuthenticated" class="ma-10">
            Bine ai venit {{ username }}
        </div>
    </v-main>
</template>

<script>
console.log('test')
export default {
    name: 'Home',
    computed: {
        username() {
            return this.$store.state.user.username
        }
    }
}
</script>
