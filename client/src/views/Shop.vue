<template>
    <v-main>
        <div class="d-flex align-center justify-center">
            <div class="text-center text-h5 font-weight-bold ma-10">Perfumes</div>
            <v-btn v-if="role === 'admin'" color="blue" size="large" variant="tonal" @click="navToAddForm">
                Add perfume
            </v-btn>
        </div>
        <v-container class="mb-10">
            <v-row>
                <v-col cols="12" md="3" v-for="perfume in perfumes" :key="perfume.id">
                    <v-card class="position-relative" :elevation="3">
                        <v-img :src="perfume.imageUrl" class="mt-12" max-height="120px"></v-img>
                        <v-card-title class="text-center text-subtitle-2 font-weight-bold">
                            {{ perfume.brand }} {{ perfume.name }}
                        </v-card-title>
                        <v-card-subtitle v-if="role === 'admin'" class="text-center my-2">
                            {{ perfume.type }} | {{ perfume.category }} | {{ perfume.stock }}
                        </v-card-subtitle>
                        <v-card-subtitle v-else class="text-center my-2">
                            {{ perfume.type }} | {{ perfume.category }}
                        </v-card-subtitle>
                        <v-card-subtitle class="text-center font-weight-bold my-2">
                            {{ perfume.price }} RON
                        </v-card-subtitle>
                        <v-btn v-if="role === 'admin'" color="blue" size="x-small" 
                            class="position-absolute top-0 left-0 ma-3" 
                            icon="mdi-pencil"
                            @click="navToEditForm(perfume.id)"></v-btn>
                        <v-btn v-if="role === 'admin'" color="red" size="x-small" 
                            class="position-absolute top-0 right-0 ma-3" 
                            icon="mdi-trash-can-outline"
                            @click="handleDelete(perfume)"></v-btn>
                        <v-btn v-if="perfume.stock > 0" color="green" size="x-small"
                            :disabled="!isItemAvailable(perfume.id)"
                            class="position-absolute bottom-0 right-0 ma-3" 
                            icon="mdi-cart-outline"
                            @click="handleAddToCart(perfume)"></v-btn>
                        <v-btn v-else :disabled="perfume.stock === 0" color="red" block 
                            class="position-absolute bottom-0">
                            Sold out
                        </v-btn>
                    </v-card>
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
            perfumes: 'perfumes/getPerfumes',
            role: 'account/getUserRole',
            isItemAvailable: 'cart/isItemAvailable'
        })
    },
    methods: {
        ...mapActions({ 
            fetchPerfumes: 'perfumes/fetchPerfumes',
            deletePerfume: 'perfumes/deletePerfume',
            addToCart: 'cart/addToCart'
        }),
        navToAddForm() {
            this.$router.push('/perfumes/new')
        },
        navToEditForm(id) {
            this.$router.push(`/perfumes/${id}`)
        },
        handleDelete(perfume) {
            this.deletePerfume(perfume)
        },
        handleAddToCart(perfume) {
            this.addToCart(perfume)
            alert(`${perfume.name} added to the cart!`)
        }
    },
    created() {
        this.fetchPerfumes()
    }
}
</script>
