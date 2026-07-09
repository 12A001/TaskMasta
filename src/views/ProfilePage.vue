<template>
<div class="min-h-screen bg-[#050B2A] text-white pb-24 pt-16">
<!-- Header -->
<div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 pt-6 pb-3 border-b border-[#0E1438]">
  <h1 class="text-center text-lg font-semibold">
    Profile
  </h1>
</div>

    <!-- Loading -->
    <div
      v-if="authStore.loading"
      class="flex justify-center py-20 text-gray-400"
    >
      Loading profile...
    </div>

    <!-- Profile Content -->
    <div
      v-else-if="authStore.user"
      class="px-5"
    >

      <!-- Avatar -->
      <div class="flex flex-col items-center mt-4">

        <div
          class="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold shadow-lg"
        >
          {{ authStore.user.name?.charAt(0).toUpperCase() }}
        </div>

<div class="flex items-center gap-2 mt-4">

  <h2 class="text-2xl font-bold">
    {{ authStore.user.name }}
 <PlanBadge :plan="authStore.user.plan" />

  </h2>

</div>

        <!-- <p class="text-gray-400 text-sm">
          {{ authStore.user.email }}
        </p> -->

<div class="flex items-center gap-2 mt-1">

  <p class="text-sm text-gray-300 font-medium">
    {{ authStore.user.plan?.toUpperCase() || 'NORMAL' }} MEMBER
  </p>

</div>

      </div>

      <!-- Menu -->
      <div class="mt-6 space-y-3">

        <button
          @click="goEditProfile"
          class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center"
        >
          <span>Edit Profile</span>
          <span>›</span>
        </button>


          <!-- ACTIVITY LOG & ACHIEVMENT COMING SOON -->
        <!-- <button
          @click="goAchievements"
          class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center"
        >
          <span>Achievements</span>
          <span>›</span>
        </button> -->

        <!-- <button
          @click="goActivity"
          class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center"
        >
          <span>Activity Log</span>
          <span>›</span>
        </button> -->

        <button
          @click="goSettings"
          class="w-full bg-[#0E1438] rounded-2xl p-4 flex justify-between items-center"
        >
          <span>Settings</span>
          <span>›</span>
        </button>

      </div>

      <!-- Logout -->
<button
  @click="logout"
  :disabled="logoutLoading"
  class="w-full mt-6 bg-red-600 py-3 rounded-2xl font-semibold transition active:scale-[0.98] disabled:opacity-50"
>
  {{ logoutLoading ? 'Logging out...' : 'Logout' }}
</button>

    </div>

    <BottomNav />

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BottomNav from '@/components/BottomNav.vue'
import PlanBadge from '@/components/PlanBadge.vue'


const router = useRouter()
const authStore = useAuthStore()
const logoutLoading = ref(false)

onMounted(async () => {
  if (!authStore.user) {
    await authStore.fetchProfile()
  }
})

const goEditProfile = () => {
  router.push('/profile/edit')
}

// const goAchievements = () => {
//   router.push('/achievements')
// }

// const goActivity = () => {
//   router.push('/activity')
// }

const goSettings = () => {
  router.push('/settings')
}

const logout = async () => {
  try {
    logoutLoading.value = true

    authStore.logout()

    router.push('/login')

  } catch (err) {
    console.log(err)
  } finally {
    logoutLoading.value = false
  }
}
</script>
