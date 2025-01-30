import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const config = import.meta.env.VITE_FIREBASE_CONFIG
const firebaseConfig = JSON.parse(config)

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export default storage
