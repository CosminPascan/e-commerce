<template>
    <v-main class="d-flex align-center justify-center">
        <v-form @submit="(event) => register(event)">
            <v-card class="pa-12" min-width="380" elevation="8" rounded="lg">
                <div class="text-center text-h4 mb-6">Register</div>

                <div class="text-subtitle-1 text-medium-emphasis mb-2">Account</div>

                <v-text-field
                    class="mb-2"
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-email-outline"
                ></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis mb-2">Password</div>

                <v-text-field
                    class="mb-2"
                    v-model="password"
                    :rules="passwordRules"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    label="Password"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-outline"
                    @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-btn class="mt-6" type="submit" color="blue" size="large" variant="tonal" block>
                    Create an account
                </v-btn>
            </v-card>
        </v-form>
    </v-main>
</template>

<script>
import axiosInstance from '@/api/axios'

export default {
    name: 'Register',
    data: () => ({
        email: '',
        password: '',
        visible: false,
        emailRules: [
            (value) => !!value || 'Email is required!',
            (value) => value.length >= 8 || 'Email must contain at least 8 characters!'
        ],
        passwordRules: [
            (value) => !!value || 'Password is required!',
            (value) => value.length >= 8 || 'Password must contain at least 8 characters!'
        ]
    }),
    methods: {
        async register(event) {
            event.preventDefault()
            try {
                await axiosInstance.post('/register', {
                    email: this.email,
                    password: this.password
                })
                this.$router.push('/login')
            } catch (error) {
                if (error.status === 400) alert(error.response.data.message)
                this.email = ''
                this.password = ''
            }
        }
    }
}
</script>
