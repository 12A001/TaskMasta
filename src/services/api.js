import axios from 'axios'

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})
//  attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
  }

  return config
})

// Optional: clean error logging
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // prevent noisy console spam
    return Promise.reject(err)
  },
)

export default api
