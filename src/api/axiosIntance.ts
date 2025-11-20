import axios from 'axios'
  interface CustomImportMeta extends ImportMeta {
    env: {
      VITE_API_DEPLOY: string
    }
  }
const API_URL = (import.meta as CustomImportMeta).env.VITE_API_DEPLOY ?? 'https://tifosi-cuore-api.vercel.app/api'
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ Error en API:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)
