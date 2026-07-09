<template>
  <div class="min-h-screen bg-[#050B2A] text-white">
    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">
        <!-- Back -->
        <button @click="goBack" class="text-white text-2xl font-bold active:scale-95 transition">
          ←
        </button>

        <h1 class="text-lg font-semibold">Privacy & Security</h1>
      </div>
    </div>

    <!-- Content -->
    <div class="pt-20 px-5 space-y-4 pb-10">
      <!-- Security Overview -->
      <div class="bg-[#0E1438] p-4 rounded-2xl space-y-2">
        <h2 class="font-semibold">Security Overview</h2>
        <p class="text-sm text-gray-300">
          Your account security is our top priority. We continuously protect your data with
          encryption and monitoring systems.
        </p>
      </div>

      <!-- Privacy Controls -->
      <!-- <div class="bg-[#0E1438] p-4 rounded-2xl space-y-3">
        <h2 class="font-semibold">Privacy Controls</h2>

        <div class="flex justify-between items-center">
          <span class="text-sm">Profile Visibility</span>
          <select class="bg-[#050B2A] text-white text-sm p-2 rounded-lg">
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-sm">Activity Status</span>
          <select class="bg-[#050B2A] text-white text-sm p-2 rounded-lg">
            <option>Visible</option>
            <option>Hidden</option>
          </select>
        </div>
      </div> -->

      <!-- Security Actions -->
      <div class="bg-[#0E1438] p-4 rounded-2xl space-y-3">
        <h2 class="font-semibold">Security Actions</h2>

        <button
          @click="goPassword"
          class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center active:scale-[0.98] transition"
        >
          <span>Change Password</span>
          <span class="text-gray-400">›</span>
        </button>

        <!-- <button class="w-full bg-[#111C44] p-3 rounded-xl text-left active:scale-[0.98] transition">
          Two-Factor Authentication
        </button> -->

        <button
          @click="logoutAllDevices"
          :disabled="logoutLoading"
          class="w-full bg-red-600 p-3 rounded-xl text-left active:scale-[0.98] transition disabled:opacity-50"
        >
          {{ logoutLoading ? 'Logging out...' : 'Logout All Devices' }}
        </button>
      </div>

      <!-- Info -->
      <div class="text-xs text-gray-500 text-center pt-4">
        Your data is encrypted and protected by TaskMasta security systems
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logoutLoading = ref(false)

const goPassword = () => {
  router.push('/settings/password')
}

const goBack = () => {
  router.back()
}

const logoutAllDevices = async () => {
  try {
    logoutLoading.value = true

    await authStore.logoutAllDevices()

    // clear local session
    authStore.logout()

    router.push('/login')
  } catch (err) {
    console.log(err)
  }
}
</script>
