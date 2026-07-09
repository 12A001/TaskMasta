// src/stores/dashboard.js
import { defineStore } from 'pinia'
import dashboardService from '@/services/dashboardService'
import { useAuthStore } from './auth' // ← Import auth store
import { useTaskStore } from './task' // ← Import task store

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    loading: false,
    referralMessages: [],
  }),

  actions: {
    async fetchDashboard() {
      try {
        this.loading = true

        const { data } = await dashboardService.getDashboard()

        const authStore = useAuthStore()

        authStore.user = {
          ...authStore.user,
          ...data.user,
        }
        this.referralMessages = data.referralMessages || []

        // Fetch task data from dedicated store
        const taskStore = useTaskStore()
        await taskStore.fetchAll()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
