<template>
  <div class="min-h-screen bg-[#050B2A] text-white">
    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">
        <button
          @click="goBack"
          class="text-white text-2xl font-bold active:scale-95 transition"
        >
          ←
        </button>

        <h1 class="text-lg font-semibold">Upgrade Plan</h1>
      </div>
    </div>

    <!-- Content -->
    <div class="pt-20 px-5 space-y-4 pb-10">

      <!-- Intro -->
      <div class="bg-[#0E1438] p-4 rounded-2xl">
        <h2 class="font-semibold">Choose your plan</h2>
        <p class="text-sm text-gray-300">
          Upgrade your account to unlock higher reward tasks.
        </p>
      </div>

      <!-- FREE -->
      <div
        v-if="userPlan === 'free'"
        class="bg-[#111C44] p-4 rounded-2xl space-y-2"
      >
        <h3 class="font-semibold">Free Plan</h3>
        <p class="text-sm text-gray-300">₦0</p>

        <ul class="text-xs text-gray-400 space-y-1 mt-2">
          <li>• Create account</li>
          <li>• Browse platform</li>
          <li>• Upgrade anytime</li>
        </ul>

        <button
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
          disabled
        >
          Current Plan
        </button>
      </div>

      <!-- STARTER -->
      <div
        v-if="canSeePlan('starter')"
        class="bg-[#0E1438] p-4 rounded-2xl border border-green-500 space-y-2"
      >
        <h3 class="font-semibold text-green-400">Starter Plan</h3>

        <p class="text-sm text-gray-300">₦10,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to videos worth 50 tokens and below</li>
          <li>• Maximum reward: 50 tokens</li>
          <li>• Standard support</li>
        </ul>

        <button
          v-if="isOwned('starter')"
          disabled
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
        >
          Owned
        </button>

<button
  v-else-if="canUpgradeTo('starter')"
  @click="selectPlan('starter')"
  :disabled="loadingPlan === 'starter'"
  class="w-full mt-3 bg-green-600 py-2 rounded-xl disabled:opacity-50"
>
  <span v-if="loadingPlan === 'starter'">
    Processing...
  </span>

  <span v-else>
    Upgrade to Starter
  </span>
</button>
      </div>

      <!-- BRONZE -->
      <div
        v-if="canSeePlan('bronze')"
        class="bg-[#0E1438] p-4 rounded-2xl border border-orange-500 space-y-2"
      >
        <h3 class="font-semibold text-orange-400">Bronze Plan</h3>

        <p class="text-sm text-gray-300">₦25,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to videos worth 100 tokens and below</li>
          <li>• Maximum reward: 100 tokens</li>
          <li>• Priority support</li>
        </ul>

        <button
          v-if="isOwned('bronze')"
          disabled
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
        >
          Owned
        </button>

<button
  v-else-if="canUpgradeTo('bronze')"
  @click="selectPlan('bronze')"
  :disabled="loadingPlan === 'bronze'"
  class="w-full mt-3 bg-orange-600 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
>
  <span v-if="loadingPlan === 'bronze'">
    Processing...
  </span>

  <span v-else>
    Upgrade to Bronze
  </span>
</button>
      </div>

      <!-- SILVER -->
      <div
        v-if="canSeePlan('silver')"
        class="bg-[#0E1438] p-4 rounded-2xl border border-gray-300 space-y-2"
      >
        <h3 class="font-semibold text-gray-200">Silver Plan</h3>

        <p class="text-sm text-gray-300">₦50,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to videos worth 150 tokens and below</li>
          <li>• Maximum reward: 150 tokens</li>
          <li>• Faster withdrawals</li>
        </ul>

        <button
          v-if="isOwned('silver')"
          disabled
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
        >
          Owned
        </button>

<button
  v-else-if="canUpgradeTo('silver')"
  @click="selectPlan('silver')"
  :disabled="loadingPlan === 'silver'"
  class="w-full mt-3 bg-gray-500 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
>
  <span v-if="loadingPlan === 'silver'">
    Processing...
  </span>

  <span v-else>
    Upgrade to Silver
  </span>
</button>
      </div>

      <!-- GOLD -->
      <div
        v-if="canSeePlan('gold')"
        class="bg-[#0E1438] p-4 rounded-2xl border border-yellow-500 space-y-2"
      >
        <h3 class="font-semibold text-yellow-400">Gold Plan</h3>

        <p class="text-sm text-gray-300">₦100,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to videos worth 200 tokens and below</li>
          <li>• Maximum reward: 200 tokens</li>
          <li>• Premium support</li>
        </ul>

        <button
          v-if="isOwned('gold')"
          disabled
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
        >
          Owned
        </button>

<button
  v-else-if="canUpgradeTo('gold')"
  @click="selectPlan('gold')"
  :disabled="loadingPlan === 'gold'"
  class="w-full mt-3 bg-yellow-600 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
>
  <span v-if="loadingPlan === 'gold'">
    Processing...
  </span>

  <span v-else>
    Upgrade to Gold
  </span>
</button>
      </div>

      <!-- PLATINUM -->
      <div
        v-if="canSeePlan('platinum')"
        class="bg-[#0E1438] p-4 rounded-2xl border border-cyan-500 space-y-2"
      >
        <h3 class="font-semibold text-cyan-400">Platinum Plan</h3>

        <p class="text-sm text-gray-300">₦150,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to videos worth 250 tokens and below</li>
          <li>• Maximum reward: 250 tokens</li>
          <li>• VIP support</li>
        </ul>

        <button
          v-if="isOwned('platinum')"
          disabled
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
        >
          Owned
        </button>

<button
  v-else-if="canUpgradeTo('platinum')"
  @click="selectPlan('platinum')"
  :disabled="loadingPlan === 'platinum'"
  class="w-full mt-3 bg-cyan-600 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
>
  <span v-if="loadingPlan === 'platinum'">
    Processing...
  </span>

  <span v-else>
    Upgrade to Platinum
  </span>
</button>
      </div>

      <!-- DIAMOND -->
      <div
        v-if="canSeePlan('diamond')"
        class="bg-[#0E1438] p-4 rounded-2xl border border-blue-500 space-y-2"
      >
        <h3 class="font-semibold text-blue-400">Diamond Plan</h3>

        <p class="text-sm text-gray-300">₦200,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to videos worth 300 tokens and below</li>
          <li>• Maximum reward: 300 tokens</li>
          <li>• Dedicated support</li>
        </ul>

        <button
          v-if="isOwned('diamond')"
          disabled
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
        >
          Owned
        </button>

        <button
          v-else-if="canUpgradeTo('diamond')"
          @click="selectPlan('diamond')"
          :disabled="loadingPlan === 'diamond'"
          class="w-full mt-3 bg-blue-600 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span v-if="loadingPlan === 'diamond'">
            Processing...
          </span>

          <span v-else>
            Upgrade to Diamond
          </span>
        </button>

      </div>

      <!-- ELITE -->
      <div
        v-if="canSeePlan('elite')"
        class="bg-[#0E1438] p-4 rounded-2xl border border-purple-500 space-y-2"
      >
        <h3 class="font-semibold text-purple-400">Elite Plan</h3>

        <p class="text-sm text-gray-300">₦500,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to videos worth 500 tokens and below</li>
          <li>• Maximum reward: 500 tokens</li>
          <li>• Highest earning potential</li>
          <li>• Exclusive VIP support</li>
        </ul>

        <button
          v-if="isOwned('elite')"
          disabled
          class="w-full mt-3 bg-gray-600 py-2 rounded-xl"
        >
          Owned
        </button>

        <button
          v-else-if="canUpgradeTo('elite')"
          @click="selectPlan('elite')"
          :disabled="loadingPlan === 'elite'"
          class="w-full mt-3 bg-purple-600 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span v-if="loadingPlan === 'elite'">
            Processing...
          </span>

          <span v-else>
            Upgrade to Elite
          </span>
        </button>
      </div>

      <!-- STATUS -->
      <p
        v-if="message"
        class="text-center text-green-400 text-sm"
      >
        {{ message }}
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const message = ref('')
const loadingPlan = ref(null)

const goBack = () => router.back()

onMounted(() => {
  authStore.fetchProfile()
})

const userPlan = computed(() => authStore.user?.plan || 'free')

const rank = {
  free: 0,
  starter: 1,
  bronze: 2,
  silver: 3,
  gold: 4,
  platinum: 5,
  diamond: 6,
  elite: 7
}

const isOwned = (plan) => userPlan.value === plan

const canUpgradeTo = (plan) => {
  return rank[plan] > rank[userPlan.value]
}

const canSeePlan = (plan) => {
  return rank[plan] >= rank[userPlan.value]
}

const selectPlan = async (plan) => {
  try {
    loadingPlan.value = plan
    message.value = 'Starting payment...'

    const res = await authStore.initializeUpgrade(plan)

    if (!res.success) {
      message.value = res.message
      loadingPlan.value = null
      return
    }

    const url = res.data?.url

    if (!url) {
      message.value = 'Payment link missing'
      loadingPlan.value = null
      return
    }

    window.location.href = url

  } catch (error) {
    console.error(error)
    message.value = 'Payment failed. Try again.'
    loadingPlan.value = null
  }
}
</script>
