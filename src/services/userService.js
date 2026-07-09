import api from './api'

const userService = {
  async getStats() {
    const { data } = await api.get('/user/stats')
    return data
  }
}

export default userService
