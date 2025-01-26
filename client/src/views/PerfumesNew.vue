<template>
    <v-main class="d-flex align-center justify-center bg-grey-lighten-3">
        <v-form class="ma-12" @submit.prevent="handleCreatePerfume" ref="form">
            <v-card class="px-12 py-10" width="700" elevation="8" rounded="lg">
                <div class="d-flex align-center justify-space-between pb-10">
                    <v-img :src="imageSrc" max-height="80px" max-width="120px"></v-img>
                    <div class="text-center text-h5 font-weight-bold">New perfume</div>
                    <v-btn type="submit" color="blue">Create</v-btn>
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
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            perfume: {
                name: '',
                brand: '',
                type: 'Choose a type',
                category: 'Choose a category',
                price: null,
                stock: null,
                variants: [],
                imageUrl: ''
            },
            image: null,
            textInputRules: [
                value => !!value || 'This field is required!',
                value => value.length >= 3 || 'This field must contain at least 3 characters!'
            ],
            selectInputRules: [
                value => value !== 'Choose a type' || 'This selection is required!',
                value => value !== 'Choose a category' || 'This selection is required!'
            ],
            numericInputRules: [value => !!value || 'This field is required!'],
            numericArrayInputRules: [array => array.length > 0 || 'Add more values!'],
            fileInputRules: [
                value => value.length !== 0 || 'This field is required!',
                value => value[0].type.includes('image/') || 'File format is wrong!'
            ]
        }
    },
    computed: {
        imageSrc() {
            if (this.image) return URL.createObjectURL(this.image)
        }
    },
    methods: {
        ...mapActions({ addPerfume: 'perfumes/addPerfume' }),
        async handleCreatePerfume() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.perfume.variants = this.perfume.variants.map(v => Number(v))
                this.addPerfume({ perfume: this.perfume, image: this.image })
            } else {
                alert('Fix errors before submitting!')
            }
        }
    }
}
</script>
