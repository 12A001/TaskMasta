import api from '@/services/api'

export default {
  createWithdrawal(data) {
    return api.post('/withdraw', data)
  },

  getWithdrawals() {
    return api.get('/withdraw')
  }
}
