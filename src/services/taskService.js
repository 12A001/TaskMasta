// src/services/taskService.js
import api from './api' //  axios instance

const taskService = {
  async getTasks() {
    const { data } = await api.get('/tasks')
    return data
  },

  async getDailyGoal() {
    const { data } = await api.get('/tasks/daily-goal')
    return data
  },

  async completeVideoTask(code) {
    const { data } = await api.post('/tasks/video/complete', { code })
    return data
  },

  async completeTask(taskId, proof = {}) {
    const { data } = await api.post(`/tasks/${taskId}/complete`, proof)
    return data
  },

  // Refresh only task-related data
  async refreshTaskProgress() {
    const { data } = await api.get('/tasks/progress')
    return data
  },
  async updateTaskProgress(payload) {
  const { data } = await api.post('/tasks/progress', payload)
  return data
},
async verifyTask(payload) {
  const { data } = await api.post('/tasks/verify', payload)
  return data
},
  async getAllAdminTasks() {
    const { data } = await api.get('/admin/tasks')
    return data
  },

  async createTask(payload) {
    const { data } = await api.post('/admin/tasks', payload)
    return data
  },

  async updateTask(id, payload) {
    const { data } = await api.put(`/admin/tasks/${id}`, payload)
    return data
  },

  async deleteTask(id) {
    const { data } = await api.delete(`/admin/tasks/${id}`)
    return data
  }

}

export default taskService
