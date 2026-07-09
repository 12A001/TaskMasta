<template>
  <div class="min-h-screen bg-[#050B2A] text-white">

    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">

        <!-- Back Button -->
        <button
          @click="goBack"
          class="text-white text-2xl font-bold active:scale-95 transition"
        >
          ←
        </button>

        <h1 class="text-lg font-semibold">
          Settings
        </h1>

      </div>
    </div>

<!-- Content -->
<div class="pt-20 px-5 space-y-3 pb-10">

  <button
    @click="goChangePassword"
    class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center active:scale-[0.98] transition"
  >
    <span>Change Password</span>
    <span class="text-gray-400">›</span>
  </button>

  <!-- <button
    @click="goNotifications"
    class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center active:scale-[0.98] transition"
  >
    <span>Notifications</span>
    <span class="text-gray-400">›</span>
  </button> -->

  <button
    @click="goPrivacy"
    class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center active:scale-[0.98] transition"
  >
    <span>Privacy & Security</span>
    <span class="text-gray-400">›</span>
  </button>

  <button
    @click="goHelp"
    class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center active:scale-[0.98] transition"
  >
    <span>Help & Support</span>
    <span class="text-gray-400">›</span>
  </button>

</div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goChangePassword = () => {
  router.push('/settings/password')
}

// const goNotifications = () => {
//   router.push('/settings/notifications')
// }

const goPrivacy = () => {
  router.push('/settings/privacy')
}

const goHelp = () => {
  router.push('/settings/help')
}
</script>
