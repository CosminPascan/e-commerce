import router from '@/router'
import store from '@/store'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.status === 403) {
            store.dispatch('account/logout')
            router.push('/login')
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
