import api from '@/services/api'

export default {
  getBalance() {
    return api.get('/wallet/balance')
  }
}
