<template>
    <v-main class="bg-grey-lighten-3">
        <v-container class="mb-5">
            <v-infinite-scroll @load="load" :disabled="!hasMore">
                <div class="d-flex align-center justify-center mx-10 mb-8 ga-16">
                    <div class="text-center text-h5 font-weight-bold">Perfumes</div>
                    <v-btn v-if="role === 'admin'" color="blue" size="large" @click="navToAddForm">
                        Add perfume
                    </v-btn>
                    <v-text-field v-else class="filter" max-width="300" density="compact" 
                        prepend-inner-icon="mdi-filter-variant" @input="handleSearch">
                    </v-text-field>
                </div>
                <v-row class="mx-10">
                    <v-col cols="12" md="3" v-for="perfume in filteredPerfumes" :key="perfume.id">
                        <v-card class="position-relative rounded-lg elevation-8">
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
                <template v-slot:empty>
                    <v-alert type="warning" class="mx-10 mt-5">No more items!</v-alert>
                </template>
            </v-infinite-scroll>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            hasMore: true,
            searchValue: ''
        }
    },
    computed: {
        ...mapGetters({ 
            perfumes: 'perfumes/getPerfumes',
            role: 'account/getUserRole',
            isItemAvailable: 'cart/isItemAvailable'
        }),
        filteredPerfumes () {
            if (this.searchValue !== '') {
                const filtered = this.perfumes.filter(p => 
                    p.name.toLowerCase().includes(this.searchValue) 
                    || p.brand.toLowerCase().includes(this.searchValue))
                return filtered
            }
            return this.perfumes
        }
    },
    methods: {
        ...mapActions({ 
            fetchFirstBatch: 'perfumes/fetchFirstBatch',
            fetchNextBatch: 'perfumes/fetchNextBatch',
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
        },
        handleSearch(e) {
            this.searchValue = e.target.value
        },
        async load({ done }) {
            setTimeout(async () => {
                const res = await this.fetchNextBatch()
                if (res === 'empty') {
                    this.hasMore = false
                    done('empty')
                } else {
                    done('ok')
                }
            }, 100)
        }
    },
    created() {
        this.fetchFirstBatch()
    }
}
</script>

<style>
.filter .v-input__details {
    display: none;
}
</style>
