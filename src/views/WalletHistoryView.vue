<script setup>
import {
  ArrowLeft,
  ArrowDownCircle,
  Gift,
  Video,
  Users,
  Wallet
} from 'lucide-vue-next'

import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useTransactionStore } from '@/stores/transaction'
// import { useWithdrawStore } from '@/stores/withdraw'

const router = useRouter()

const transactionStore = useTransactionStore()

const goBack = () => {
  router.back()
}

onMounted(async () => {
  await transactionStore.fetchTransactions()
})

const history = computed(() => {
  const transactions = Array.isArray(transactionStore.transactions)
    ? transactionStore.transactions
    : []

return [...transactions].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
)
})

const getIcon = (item) => {
  switch (item.type) {
    case 'video':
      return Video

    case 'referral':
      return Users

    case 'bonus':
      return Gift

    case 'withdrawal':
      return ArrowDownCircle

    default:
      return Wallet
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#050B2A] text-white">

    <!-- Header -->
    <div class="sticky top-0 z-10 bg-[#050B2A] px-4 pt-6 pb-4">

      <div class="flex items-center gap-3">

        <button
          @click="goBack"
          class="w-10 h-10 rounded-xl bg-[#111C44] flex items-center justify-center"
        >
          <ArrowLeft class="w-5 h-5" />
        </button>

        <div>
          <h1 class="text-xl font-bold">
             History
          </h1>

          <p class="text-xs text-gray-400">
             Withdrawals
          </p>
        </div>

      </div>

    </div>

    <!-- Empty State -->
    <div
      v-if="history.length === 0"
      class="flex flex-col items-center justify-center h-[70vh] text-center px-6"
    >
      <Wallet class="w-16 h-16 text-gray-600 mb-4" />

      <h3 class="text-lg font-semibold">
        No Transactions Yet
      </h3>

      <p class="text-gray-400 text-sm mt-2">
        Your withdrawals will appear here.
      </p>
    </div>

    <!-- History List -->
    <div
      v-else
      class="px-4 py-4 space-y-3"
    >
      <div
        v-for="item in history"
        :key="item._id"
        class="bg-[#111C44] rounded-2xl p-4 flex items-center justify-between border border-white/5"
      >
        <div class="flex items-center gap-3">

          <div
            class="w-11 h-11 rounded-xl bg-[#1B2559] flex items-center justify-center"
          >
            <component
              :is="getIcon(item)"
              class="w-5 h-5 text-purple-400"
            />
          </div>

          <div>
            <p class="font-medium">
              {{ item.title }}
            </p>

            <p class="text-xs text-gray-400">
              {{ item.date }}
            </p>
          </div>

        </div>

        <div
          :class="
            item.amount > 0
              ? 'text-green-400'
              : 'text-red-400'
          "
          class="font-semibold"
        >
          {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
        </div>

      </div>
    </div>

  </div>
</template>
