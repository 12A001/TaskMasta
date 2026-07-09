import api from './api'

const notificationService = {
  async getAll() {
    const { data } = await api.get('/notifications')
    return data
  },

  async markAsRead(id) {
    const { data } = await api.patch(`/notifications/${id}`)
    return data
  },

  async create(payload) {
    const { data } = await api.post('/notifications', payload)
    return data
  }
}

export default notificationService
