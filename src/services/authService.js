import api from '@/services/api'

export default {
  login(data) {
    return api.post('/auth/login', data)
  },

  register(data) {
    return api.post('/auth/register', data)
  },

  getProfile() {
    return api.get('/auth/profile')
  },

  updatePlan(plan) {
    return api.patch('/auth/plan', { plan })
  },
  changePassword(data) {
    return api.patch('/auth/change-password', data)
  },
   logoutAllDevices() {
    return api.post('/auth/logout-all')
  }

}
