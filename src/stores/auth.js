// stores/auth.js

import { defineStore } from 'pinia'
import authService from '@/services/authService'
import profileService from '@/services/profileService'
import paymentService from '@/services/paymentService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
async register(payload) {
  try {
    this.loading = true

    const { data } = await authService.register(payload)

    this.token = data.token
    this.user = data.user

    localStorage.setItem('token', data.token)

    return {
      success: true,
      data
    }

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        'Registration failed'
    }

  } finally {
    this.loading = false
  }
},

async login(payload) {
  try {
    this.loading = true

    const { data } = await authService.login(payload)

    this.token = data.token
    this.user = data.user

    localStorage.setItem('token', data.token)

    return data

  } catch (error) {
    throw error?.response?.data?.message || 'Invalid credentials'
  } finally {
    this.loading = false
  }
},

    async fetchProfile() {
      try {
        this.loading = true

        const { data } = await authService.getProfile()

        this.user = data.user
      } catch (error) {
        this.logout()
      } finally {
        this.loading = false
      }
    },
    async updateProfile(payload) {
  try {
    this.loading = true

    const { data } = await profileService.updateProfile(payload)

    // update local state instantly
    this.user = data.user

    return {
      success: true,
      data
    }

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Update failed'
    }

  } finally {
    this.loading = false
  }
},
  async initializeUpgrade(plan) {
  try {
    this.loading = true

    const { data } = await paymentService.initializeUpgrade(plan)

    return {
      success: true,
      data
    }

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Payment failed'
    }

  } finally {
    this.loading = false
  }
},
async changePassword(payload) {
  try {
    this.passwordLoading = true

    const response = await authService.changePassword(payload)

    return response.data
  } finally {
    this.passwordLoading = false
  }
},
async logoutAllDevices() {
  try {
    this.loading = true

    const { data } = await authService.logoutAllDevices()

    // clear local session immediately
    this.logout()

    return {
      success: true,
      data
    }

  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Logout failed'
    }

  } finally {
    this.loading = false
  }
},
    logout() {
      localStorage.removeItem('token')

      this.token = null
      this.user = null
    }
  }
})
