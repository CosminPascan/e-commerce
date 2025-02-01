<template>
    <v-main class="d-flex align-center justify-center bg-grey-lighten-3">
        <v-form class="ma-12 w-md-50" @submit.prevent="handleEditPerfume" ref="form">
            <v-card class="px-12 py-10" elevation="8" rounded="lg">
                <div class="d-flex align-center justify-space-between pb-10 ga-4">
                    <v-img :src="imageSrc" max-height="80" max-width="100"></v-img>
                    <div class="text-center text-h5 font-weight-bold">Edit</div>
                    <v-btn type="submit" color="blue">Edit</v-btn>
                </div>

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="perfume.name"
                            :rules="textInputRules"
                            label="Name"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="perfume.brand"
                            :rules="textInputRules"
                            label="Brand"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="perfume.type"
                            :items="['eau de toilette', 'eau de parfum', 'parfum']"
                            :rules="selectInputRules"
                            label="Type"
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                    <v-col>
                        <v-select
                            v-model="perfume.category"
                            :items="['men', 'women', 'unisex']"
                            :rules="selectInputRules"
                            label="Category"
                            density="compact"
                            variant="outlined"
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model.number="perfume.price"
                            :rules="numericInputRules"
                            label="Price (RON)"
                            type="number"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model.number="perfume.stock"
                            :rules="numericInputRules"
                            label="Stock"
                            type="number"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-combobox
                            v-model="perfume.variants"
                            :rules="numericArrayInputRules"
                            label="Variants (ml)"
                            type="number"
                            density="compact"
                            variant="outlined"
                            clearable
                            chips
                            multiple
                        ></v-combobox>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-file-input
                            v-model="image"
                            :rules="fileInputRules"
                            label="Image"
                            prepend-icon=""
                            prepend-inner-icon="mdi-camera"
                            density="compact"
                            variant="outlined"
                            clearable
                            chips
                        ></v-file-input>
                    </v-col>
                </v-row>
            </v-card>
        </v-form>
    </v-main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            perfume: {},
            image: null,
            textInputRules: [
                value => !!value || 'This field is required!',
                value => value.length >= 3 || 'This field must contain at least 3 characters!'
            ],
            selectInputRules: [
                value => value !== 'Choose a type' || 'This selection is required!',
                value => value !== 'Choose a category' || 'This selection is required!'
            ],
            numericInputRules: [
                value => !!value || 'This field is required!',
                value => value > 0 || 'This field must be a positive number!'
            ],
            numericArrayInputRules: [array => array.length > 0 || 'Add more values!'],
            fileInputRules: [
                value => (value.length === 0 || value[0].type.includes('image/')) || 'File format is wrong!'
            ]
        }
    },
    computed: {
        ...mapGetters({ getPerfumeById: 'perfumes/getPerfumeById' }),
        imageSrc() {
            if (this.image) return URL.createObjectURL(this.image)
            return this.perfume.imageUrl
        }
    },
    methods: {
        ...mapActions({ editPerfume: 'perfumes/editPerfume' }),
        async handleEditPerfume() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.perfume.variants = this.perfume.variants.map(v => Number(v))
                const id = this.perfume.id
                delete this.perfume.id
                this.editPerfume({ id: id, perfume: this.perfume, image: this.image })
            } else {
                alert('Fix errors before submitting!')
            }
        }
    },
    created() {
        const id = this.$route.params.id
        this.perfume = this.getPerfumeById(id)
    }
}
</script>
