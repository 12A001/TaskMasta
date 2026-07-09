<template>
  <div class="min-h-screen bg-[#050B2A] text-white">

    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">

        <!-- Back -->
        <button
          @click="goBack"
          class="text-white text-2xl font-bold active:scale-95 transition"
        >
          ←
        </button>

        <h1 class="text-lg font-semibold">
          Notifications
        </h1>

      </div>
    </div>

    <!-- Content -->
    <div class="pt-20 px-5 space-y-4 pb-10">

      <!-- Info -->
      <div class="bg-[#0E1438] p-4 rounded-2xl">
        <h2 class="font-semibold mb-2">Stay Updated</h2>
        <p class="text-sm text-gray-300">
          Control how and when TaskNova sends you updates.
        </p>
      </div>

      <!-- Toggles -->
      <div class="bg-[#0E1438] p-4 rounded-2xl space-y-4">

        <!-- Email -->
        <div class="flex items-center justify-between">
          <span class="text-sm">Email Notifications</span>
          <input type="checkbox" v-model="email" class="w-5 h-5" />
        </div>

        <!-- Push -->
        <div class="flex items-center justify-between">
          <span class="text-sm">Push Notifications</span>
          <input type="checkbox" v-model="push" class="w-5 h-5" />
        </div>

        <!-- Transactions -->
        <div class="flex items-center justify-between">
          <span class="text-sm">Transaction Alerts</span>
          <input type="checkbox" v-model="transactions" class="w-5 h-5" />
        </div>

        <!-- Security -->
        <div class="flex items-center justify-between">
          <span class="text-sm">Security Alerts</span>
          <input type="checkbox" v-model="security" class="w-5 h-5" />
        </div>

      </div>

      <!-- Save -->
      <button
        class="w-full bg-blue-600 py-3 rounded-xl font-semibold active:scale-[0.98] transition"
        @click="saveSettings"
      >
        Save Changes
      </button>

      <!-- Info -->
      <div class="text-xs text-gray-500 text-center pt-2">
        Changes apply instantly to your account
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref(true)
const push = ref(true)
const transactions = ref(true)
const security = ref(true)

const goBack = () => {
  router.back()
}

const saveSettings = () => {
  // later connect to backend API
  console.log({
    email: email.value,
    push: push.value,
    transactions: transactions.value,
    security: security.value
  })
}
</script>
