import api from '@/services/api'

export default {
  getLeaderboard() {
    return api.get('/leaderboard')
  }
}
