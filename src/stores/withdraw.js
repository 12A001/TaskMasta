import { defineStore } from 'pinia'
import withdrawService from '@/services/withdrawService'

export const useWithdrawStore = defineStore('withdraw', {
  state: () => ({
    withdrawals: [],
    loading: false
  }),

  actions: {
    async fetchWithdrawals() {
      this.loading = true
      const { data } = await withdrawService.getWithdrawals()
      this.withdrawals = data.withdrawals
      this.loading = false
    },

    async requestWithdraw(payload) {
      const { data } = await withdrawService.createWithdrawal(payload)

      // instantly show in UI
      this.withdrawals.unshift(data.withdrawal)
    }
  }
})
