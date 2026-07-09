<template>
  <div class="min-h-screen bg-[#050B2A] text-white">
    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">
        <button @click="goBack" class="text-white text-2xl font-bold active:scale-95 transition">
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
          Upgrade your account to unlock premium features and higher limits.
        </p>
      </div>

      <!-- FREE -->
<!-- FREE -->
<div
  v-if="userPlan === 'free'"
  class="bg-[#111C44] p-4 rounded-2xl space-y-2"
>        <h3 class="font-semibold">Free Plan</h3>
        <p class="text-sm text-gray-300">₦0</p>

        <ul class="text-xs text-gray-400 space-y-1 mt-2">
          <li>• Basic features</li>
          <li>• Limited transactions</li>
          <li>• Standard support</li>
        </ul>

        <button class="w-full mt-3 bg-gray-600 py-2 rounded-xl" disabled>
          {{ userPlan === 'free' ? 'Current Plan' : 'Owned' }}
        </button>
      </div>

      <!-- NORMAL -->
      <div
        v-if="canSeePlan('normal')"
        class="bg-[#0E1438] p-4 rounded-2xl space-y-2 border border-green-500"
      >
        <h3 class="font-semibold text-green-400">Normal Plan</h3>
        <p class="text-sm text-gray-300">₦2,500</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to low-tier tasks</li>
          <li>• Earn 10–50 tokens per video</li>
          <li>• Standard support</li>
        </ul>

        <button v-if="isOwned('normal')" disabled class="w-full mt-3 bg-gray-600 py-2 rounded-xl">
          Owned
        </button>

        <button
          v-else-if="canUpgradeTo('normal')"
          @click="selectPlan('normal')"
          class="w-full mt-3 bg-green-600 py-2 rounded-xl"
        >
          Upgrade to Normal
        </button>
      </div>

      <!-- PREMIUM -->
      <div
        v-if="canSeePlan('premium')"
        class="bg-[#0E1438] p-4 rounded-2xl space-y-2 border border-blue-500"
      >
        <h3 class="font-semibold text-blue-400">Premium Plan</h3>
        <p class="text-sm text-gray-300">₦5,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to medium-tier tasks</li>
          <li>• Earn 50–200 tokens per video</li>
          <li>• Priority support</li>
        </ul>

        <button v-if="isOwned('premium')" disabled class="w-full mt-3 bg-gray-600 py-2 rounded-xl">
          Owned
        </button>

        <button
          v-else-if="canUpgradeTo('premium')"
          @click="selectPlan('premium')"
          class="w-full mt-3 bg-blue-600 py-2 rounded-xl"
        >
          Upgrade to Premium
        </button>
      </div>

      <!-- SUPER -->
      <div
        v-if="canSeePlan('super')"
        class="bg-[#0E1438] p-4 rounded-2xl space-y-2 border border-purple-500"
      >
        <h3 class="font-semibold text-purple-400">Super Plan</h3>
        <p class="text-sm text-gray-300">₦10,000</p>

        <ul class="text-xs text-gray-300 space-y-1 mt-2">
          <li>• Access to all tasks</li>
          <li>• Earn 200+ tokens per video</li>
          <li>• VIP support</li>
        </ul>

        <button v-if="isOwned('super')" disabled class="w-full mt-3 bg-gray-600 py-2 rounded-xl">
          Owned
        </button>

        <button
          v-else-if="canUpgradeTo('super')"
          @click="selectPlan('super')"
          class="w-full mt-3 bg-purple-600 py-2 rounded-xl"
        >
          Upgrade to Super
        </button>
      </div>

      <!-- STATUS -->
      <p v-if="message" class="text-center text-green-400 text-sm">
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

const goBack = () => router.back()

/*  ALWAYS keep user fresh */
onMounted(() => {
  authStore.fetchProfile()
})

const userPlan = computed(() => authStore.user?.plan || 'free')

const rank = {
  free: 0,
  normal: 1,
  premium: 2,
  super: 3,
}

const isOwned = (plan) => {
  return userPlan.value === plan
}

const canUpgradeTo = (plan) => {
  return rank[plan] > rank[userPlan.value]
}

const canSeePlan = (plan) => {
  return rank[plan] >= rank[userPlan.value]
}

/*  upgrade handler */
const selectPlan = async (plan) => {
  message.value = 'Starting payment...'

  const res = await authStore.initializeUpgrade(plan)

  if (!res.success) {
    message.value = res.message
    return
  }

  const url = res.data?.url || res.data?.authorization_url

  if (!url) {
    message.value = 'Payment link missing'
    return
  }

  window.location.href = url
}
</script>
