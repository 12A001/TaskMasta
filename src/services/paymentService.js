import api from '@/services/api'

export default {
  initializeUpgrade(plan) {
    return api.post('/payments/initialize', { plan })
  },


  verifyPayment(sessionId) {
    return api.get(`/payments/verify/${sessionId}`)
  }
}

