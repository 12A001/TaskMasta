import api from '@/services/api'

export default {
  getDashboard() {
    return api.get('/dashboard')
  }
}
