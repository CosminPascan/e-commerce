import axiosInstance from '@/api/axios'
import storage from '@/firebase'
import router from '@/router'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default {
    namespaced: true,
    state: {
        perfumes: []
    },
    getters: {
        getPerfumes: state => state.perfumes,
        getPerfumeById: state => id => state.perfumes.find(p => p.id === id)
    },
    mutations: {
        SET_PERFUMES(state, perfumes) {
            state.perfumes = perfumes
        },
        ADD_PERFUME(state, perfume) {
            state.perfumes.push(perfume)
        },
        DELETE_PERFUME(state, id) {
            state.perfumes = state.perfumes.filter(p => p.id !== id)
        }
    },
    actions: {
        async fetchPerfumes({ commit }) {
            try {
                const response = await axiosInstance.get('/perfumes')
                commit('SET_PERFUMES', response.data)
            } catch (error) {
                console.error(error.response.data.message)
            }
        },
        async addPerfume({ commit }, payload) {
            const { perfume, image } = payload

            const fileName = `${new Date().getTime()}_${perfume.name.replace(/\s+/g, '_')}`
            const storageRef = ref(storage, `images/${fileName}`)

            try {
                const snapshot = await uploadBytes(storageRef, image)
                const url = await getDownloadURL(snapshot.ref)
                perfume.imageUrl = url

                const response = await axiosInstance.post('/perfumes', perfume)
                commit('ADD_PERFUME', response.data)
                router.push('/shop')
            } catch {
                console.error(error.response.data.message)
            }
        },
        async deletePerfume({ commit }, perfume) {
            try {
                await axiosInstance.delete(`/perfumes/${perfume.id}`)

                const fileName = perfume.imageUrl.split('images%2F')[1]?.split('?')[0]
                if (fileName) {
                    const storageRef = ref(storage, `images/${fileName}`)
                    await deleteObject(storageRef)
                }

                commit('DELETE_PERFUME', perfume.id)
            } catch (error) {
                console.error(error.response.data.message)
            }
        }
    }
}
