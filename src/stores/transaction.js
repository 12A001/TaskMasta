import { defineStore } from 'pinia'
import transactionService from '@/services/transactionService'

export const useTransactionStore = defineStore('transactions', {
  state: () => ({
    transactions: [],
    loading: false
  }),

  actions: {
    async fetchTransactions() {
      try {
        this.loading = true

        const { data } = await transactionService.getRecentTransactions()

        this.transactions = data.transactions
      } catch (err) {
        console.error('Transaction fetch error:', err)
      } finally {
        this.loading = false
      }
    },

    //  real-time update when user earns coins
    addTransaction(tx) {
      this.transactions.unshift(tx)
    }
  }
})
