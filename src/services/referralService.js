import api from '@/services/api'

export default {
  async getReferrals() {
    const { data } = await api.get('/auth/referrals')
    return data
  }
  
}