import api from '@/services/api'

export default {
  getRecentTransactions() {
    return api.get('/wallet/transactions')
  }
}
