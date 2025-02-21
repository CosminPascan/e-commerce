import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import store from './store'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives
})

app.use(vuetify)
app.use(store)
app.use(router)

app.mount('#app')
