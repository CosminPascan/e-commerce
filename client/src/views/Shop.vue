<template>
    <v-main>
        <div class="d-flex align-center justify-center">
            <!-- TODO vizibile doar pt useri fara rol -->
            <div class="text-center text-h5 font-weight-bold">Perfumes</div>
            <!-- TODO vizibile doar pt useri cu rolul admin -->
            <v-btn class="ma-10" color="blue" size="large" variant="tonal" @click="navToAddForm">Add perfume</v-btn>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" md="3" v-for="perfume in perfumes" :key="perfume.id">
                    <v-card class="position-relative" :elevation="3">
                        <v-img :src="perfume.imageUrl" class="mt-12" max-height="120px"></v-img>
                        <v-card-title class="text-center text-subtitle-2 font-weight-bold">{{ perfume.name }}</v-card-title>
                        <v-card-subtitle class="text-center my-2">{{ perfume.price }} RON</v-card-subtitle>
                        <!-- TODO vizibile doar pt useri cu rolul admin -->
                        <v-btn class="position-absolute top-0 right-0 ma-3" icon="mdi-trash-can-outline" color="red" size="x-small" @click="handleDelete(perfume)"></v-btn>
                        <v-btn class="position-absolute top-0 left-0 ma-3" icon="mdi-pencil" color="blue" size="x-small" @click="navToEditForm(perfume.id)"></v-btn>
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
        ...mapActions({ 
            fetchPerfumes: 'perfumes/fetchPerfumes',
            deletePerfume: 'perfumes/deletePerfume'
        }),
        navToAddForm() {
            this.$router.push('/perfumes/new')
        },
        navToEditForm(id) {
            this.$router.push(`/perfumes/${id}`)
        },
        handleDelete(perfume) {
            this.deletePerfume(perfume)
        }
    },
    created() {
        this.fetchPerfumes()
    }
}
</script>
