import { defineStore } from 'pinia'
import taskService from '@/services/taskService'

export const useAdminTaskStore = defineStore('adminTask', {
  state: () => ({
    tasks: [],
    loading: false
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        this.tasks = await taskService.getAllAdminTasks()
      } finally {
        this.loading = false
      }
    },

    async createTask(payload) {
      const newTask = await taskService.createTask(payload)
      this.tasks.unshift(newTask)
    },

    async updateTask(id, payload) {
      const updated = await taskService.updateTask(id, payload)

      const index = this.tasks.findIndex(t => t._id === id)
      if (index !== -1) this.tasks[index] = updated
    },

    async deleteTask(id) {
      await taskService.deleteTask(id)
      this.tasks = this.tasks.filter(t => t._id !== id)
    }
  }
})
