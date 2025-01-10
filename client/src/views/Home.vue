<template>
    <v-main>
        <div v-if="$store.state.isAuthenticated" class="ma-10">
            Bine ai venit {{ username }}
        </div>
        <v-btn class="ma-10" color="blue" size="large" variant="tonal" @click="request">
            Get data
        </v-btn>
    </v-main>
</template>

<script>
import axiosInstance from '@/api/axios';

export default {
    name: 'Home',
    computed: {
        username() {
            return this.$store.state.user.username
        }
    },
    methods: {
        async request() {
            const res = await axiosInstance.get('/perfumes')
            console.log(res.data)
        }
    }
}
</script>
