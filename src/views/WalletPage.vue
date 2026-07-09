<script setup>
import BottomNav from '@/components/BottomNav.vue'
import walletBg from '@/assets/images/WalletHeader.png'
import TaskNovaCoin from '@/assets/images/TaskNovaCoin.png'

import { ArrowDownCircle, History, Eye, EyeOff } from 'lucide-vue-next'

import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet'
import { useTransactionStore } from '@/stores/transaction'
import { useWithdrawStore } from '@/stores/withdraw'
import { useRouter } from 'vue-router'

/* ================= STORES ================= */
const authStore = useAuthStore()
const walletStore = useWalletStore()
const transactionStore = useTransactionStore()
const withdrawStore = useWithdrawStore()
const router = useRouter()

/* ================= SAFE STATE ================= */
const user = computed(() => authStore.user || null)
const balance = computed(() => walletStore.balance ?? 0)
const transactions = computed(() => transactionStore.transactions ?? [])

/* ================= INIT ================= */
onMounted(async () => {
  try {
    if (!authStore.user) {
      await authStore.fetchProfile()
    }

    await Promise.all([
      walletStore.fetchBalance(),
      transactionStore.fetchTransactions(),
    ])
  } catch (e) {
    console.log('Wallet init error:', e)
  }
})

/* ================= FORMAT ================= */
const formatNumber = (n) => new Intl.NumberFormat('en-NG').format(n)

const formatNaira = (amount) =>
  new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

/* ================= BALANCE ================= */
const tokensToNaira = computed(() => (balance.value || 0) * 70)

/* ================= MODAL ================= */
const showModal = ref(false)
const amount = ref('')
const bankName = ref('')
const accountNumber = ref('')
const accountName = ref('')
const pin = ref('')
const showPin = ref(false)

/* ================= LIMIT SYSTEM ================= */
const _DAILY_LIMITS = {
  super: 1000000,
  normal: 50000,
}

const todayWithdrawTotal = ref(0)

const userLimit = computed(() => {
  const type = user.value?.accountType || 'normal'
  return _DAILY_LIMITS[type] || _DAILY_LIMITS.normal
})

/* ================= VALIDATION ================= */
const validateWithdraw = () => {
  const amt = Number(amount.value)

  if (!amt || amt <= 0) {
    alert('Enter valid amount')
    return false
  }

  if (amt > userLimit.value) {
    alert('Daily limit exceeded: ₦' + formatNumber(userLimit.value))
    return false
  }

  if (amt + todayWithdrawTotal.value > userLimit.value) {
    alert('You have reached your daily withdrawal limit')
    return false
  }

  if (pin.value.length !== 4) {
    alert('PIN must be 4 digits')
    return false
  }

  if (amt > balance.value) {
    alert('Insufficient balance')
    return false
  }

  return true
}

/* ================= WITHDRAW ================= */
const submitWithdraw = async () => {
  if (!validateWithdraw()) return

  const amt = Number(amount.value)

  await withdrawStore.requestWithdraw({
    amount: amt,
    bankName: bankName.value,
    accountNumber: accountNumber.value,
    accountName: accountName.value,
    pin: pin.value,
  })

  todayWithdrawTotal.value += amt

  alert('Withdrawal submitted successfully')
  showModal.value = false

  amount.value = ''
  bankName.value = ''
  accountNumber.value = ''
  accountName.value = ''
  pin.value = ''
}

/* ================= NAV ================= */
const openHistory = () => router.push('/wallet/history')
const openWithdraw = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)
</script>


<template>
  <div class="h-screen bg-[#050B2A] text-white flex flex-col">
    <!-- ================= HEADER (STATIC) ================= -->
    <div class="sticky top-0 z-20 bg-[#050B2A]">
      <!-- TITLE -->
      <div class="px-4 pt-6 text-center">
        <h1 class="text-lg font-semibold">Wallet</h1>
      </div>

      <!-- BALANCE CARD -->
      <div class="px-2 mt-5">
        <div
          class="rounded-3xl p-7 relative overflow-hidden bg-center bg-cover"
          :style="{ backgroundImage: `url(${walletBg})` }"
        >
          <div class="absolute inset-0 bg-black/40"></div>

          <div class="relative z-10">
            <p class="text-sm text-white/80">Your Balance</p>

            <div class="mt-1 flex items-center gap-2">
              <h2 class="text-3xl font-bold">
                {{ formatNumber(balance) }}
              </h2>
            <img
                :src="TaskNovaCoin"
                alt="TaskNova Coin"
                class="w-8 h-8 rounded-full object-cover"
              />
            </div>

            <p class="text-sm text-green-400 mt-1">Tokens</p>

            <p class="text-xs text-green-400 mt-2">≈ ₦{{ formatNaira(tokensToNaira) }}</p>
          </div>
        </div>
      </div>

      <!-- ACTION BUTTONS -->
      <div class="px-4 mt-4 grid grid-cols-2 gap-3">
        <button
          @click="openWithdraw"
          class="bg-[#7C3AED] py-3 rounded-2xl flex items-center justify-center gap-2"
        >
          <ArrowDownCircle class="w-5 h-5" />
          Withdraw
        </button>

        <button
          @click="openHistory"
          class="bg-[#111C44] py-3 rounded-2xl flex items-center justify-center gap-2"
        >
          <History class="w-5 h-5" />
          History
        </button>
      </div>
    </div>

    <!-- ================= TRANSACTIONS (ONLY SCROLL AREA) ================= -->
    <div class="flex-1 overflow-hidden px-4 mt-6 flex flex-col">
      <h2 class="text-sm text-gray-300 mb-3 flex-shrink-0">Recent Transactions</h2>

      <!-- SCROLL ONLY HERE -->
      <div class="flex-1 overflow-y-auto space-y-2 pr-1">
        <!-- EMPTY STATE -->
        <div
          v-if="!transactions || transactions.length === 0"
          class="h-full flex flex-col items-center justify-center text-center text-gray-400"
        >
          <!-- <div class="text-4xl mb-2">📭</div> -->
          <p class="text-sm">No recent transactions</p>
          <p class="text-xs text-gray-500 mt-1">Your earnings will appear here</p>
        </div>

        <!-- LIST -->
        <div
          v-for="(tx, i) in transactions"
          :key="i"
          class="bg-[#111C44] rounded-2xl p-3 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#1B2559] flex items-center justify-center">
              <component :is="tx.icon" class="w-5 h-5 text-purple-400" />
            </div>

            <div>
              <p class="text-sm font-medium">{{ tx.title }}</p>
              <p class="text-xs text-gray-400">{{ tx.date }}</p>
            </div>
          </div>

          <div class="text-green-400 font-semibold">
            {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount }}
          </div>
        </div>
      </div>
    </div>
    <!-- ================= WITHDRAW MODAL ================= -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-[#111C44] w-full max-w-md rounded-2xl p-4">
        <h2 class="text-lg font-semibold mb-4">Withdraw Funds</h2>

        <!-- AMOUNT -->
        <input
          v-model="amount"
          type="number"
          placeholder="Amount"
          class="w-full p-2 mb-2 bg-[#0B1020] rounded"
        />

        <!-- BANK -->
        <input
          v-model="bankName"
          placeholder="Bank Name"
          class="w-full p-2 mb-2 bg-[#0B1020] rounded"
        />

        <!-- ACCOUNT NUMBER -->
        <input
          v-model="accountNumber"
          placeholder="Account Number"
          class="w-full p-2 mb-2 bg-[#0B1020] rounded"
        />

        <!-- ACCOUNT NAME -->
        <input
          v-model="accountName"
          placeholder="Account Name"
          class="w-full p-2 mb-2 bg-[#0B1020] rounded"
        />

        <!-- PIN -->
        <!-- PIN FIELD -->
        <div class="relative mb-4">
          <input
            v-model="pin"
            :type="showPin ? 'text' : 'password'"
            maxlength="4"
            placeholder="4-digit PIN"
            class="w-full p-2 bg-[#0B1020] rounded tracking-widest text-center pr-10"
          />

          <!-- EYE ICON -->
          <button
            type="button"
            @click="showPin = !showPin"
            class="absolute right-3 top-2.5 text-gray-400"
          >
            <Eye v-if="!showPin" class="w-5 h-5" />
            <EyeOff v-else class="w-5 h-5" />
          </button>
        </div>

        <!-- BUTTONS -->
        <div class="flex gap-2">
          <button @click="closeModal" class="flex-1 py-2 bg-gray-600 rounded-xl">Cancel</button>

          <button @click="submitWithdraw" class="flex-1 py-2 bg-purple-600 rounded-xl">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- BOTTOM NAV (STATIC) -->
    <div class="flex-shrink-0">
      <BottomNav />
    </div>
  </div>
</template>
