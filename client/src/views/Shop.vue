<template>
    <v-main>
        <div class="ma-6 text-center text-h5">Add items to the cart...</div>
        <v-container>
            <v-row>
                <v-col cols="12" md="3" v-for="perfume in perfumes" :key="perfume.id">
                    <v-card :elevation="3">
                        <v-img :src="perfume.imageUrl" class="my-4" max-height="120px"></v-img>
                        <v-card-title class="text-center text-subtitle-2 font-weight-bold">{{ perfume.name }}</v-card-title>
                        <v-card-subtitle class="text-center my-2">{{ perfume.price }} RON</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Shop',
    computed: {
        ...mapGetters({ perfumes: 'perfumes/getPerfumes' })
    },
    methods: {
        ...mapActions({ fetchPerfumes: 'perfumes/fetchPerfumes' })
    },
    created() {
        this.fetchPerfumes()
    }
}
</script>
