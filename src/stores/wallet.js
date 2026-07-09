// stores/wallet.js
import { defineStore } from 'pinia'
import walletService from '@/services/walletService'

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    balance: 0,
    loading: false,
     todayEarnings: 0,
  }),

  actions: {
    async fetchBalance() {
      try {
        this.loading = true

        const { data } = await walletService.getBalance()

        this.balance = Number(data.balance || 0)
            this.todayEarnings = data.todayEarnings ?? 0  

      } catch (err) {
        console.error('Wallet fetch error:', err)
        this.balance = 0
      } finally {
        this.loading = false
      }
    },

    startAutoSync(intervalMs = 15000) {
      if (this._interval) return

      this._interval = setInterval(() => {
        this.fetchBalance()
      }, intervalMs)
    },

    stopAutoSync() {
      if (this._interval) {
        clearInterval(this._interval)
        this._interval = null
      }
    },
    setBalance(amount) {
      this.balance = Number(amount)
    },

    addCoins(amount) {
      this.balance += Number(amount)
    },
  },
})
