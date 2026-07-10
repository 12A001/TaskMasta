<template>
  <div class="min-h-screen bg-[#050B2A] text-white pb-24">

    <!-- HEADER -->
    <div class="sticky top-0 z-50 bg-[#050B2A]/95  border-b border-white/5 px-4 py-4">
      <h1 class="text-lg font-bold">Referral Rewards</h1>
      <p class="text-xs text-gray-400">
        Invite friends & earn bonuses
      </p>
    </div>

    <!-- STATS -->
    <div class="p-4 grid grid-cols-2 gap-3">

      <div class="bg-[#111C44] p-4 rounded-2xl">
        <p class="text-xs text-gray-400">Total Invites</p>
        <h2 class="text-xl font-bold">{{ data.totalReferrals }}</h2>
      </div>

      <div class="bg-[#111C44] p-4 rounded-2xl">
        <p class="text-xs text-gray-400">Earned</p>
        <div class="flex items-center gap-2">
  <img
    :src="TaskNovaCoin"
    alt="TaskNova Coin"
    class="w-5 h-5 rounded-full"
  />

  <h2 class="text-xl font-bold">
    {{ data.totalEarned }}
  </h2>
</div>
      </div>

    </div>


    <!-- REFERRAL LINK -->
    <div class="px-4 mt-4">
      <div class="bg-[#111C44] p-4 rounded-2xl">

        <p class="text-xs text-gray-400 mb-2">Your Referral Link</p>

        <div class="flex items-center justify-between gap-2">

          <input
            :value="refLink"
            readonly
            class="w-full bg-[#0B1020] p-2 rounded text-xs text-gray-300"
          />

<button
  @click="copyLink"
  :disabled="copyState === 'loading'"
  class="bg-purple-600 px-3 py-2 rounded-lg text-xs min-w-[90px] flex items-center justify-center transition-all"
>
  <div
    v-if="copyState === 'loading'"
    class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
  />

  <span v-else-if="copyState === 'success'">
    ✓ Copied
  </span>

  <span v-else>
    Copy
  </span>
</button>

        </div>

      </div>
    </div>

    <!-- BONUS MILESTONE -->
    <div class="px-4 mt-4">
      <div class="bg-[#111C44] p-4 rounded-2xl">

        <p class="text-sm font-semibold mb-2">
          🎁 Bonus Milestone
        </p>

        <p class="text-xs text-gray-400 mb-3">
          Invite 5 friends → Get extra reward
        </p>

        <div class="w-full bg-[#0B1020] h-2 rounded-full overflow-hidden">
          <div
            class="h-full bg-green-500 transition-all"
            :style="{ width: (data.totalReferrals / 5) * 100 + '%' }"
          />
        </div>

        <p class="text-xs text-gray-400 mt-2">
          {{ data.totalReferrals }}/5 completed
        </p>

      </div>
    </div>

    <!-- REFERRAL LIST -->
    <div class="px-4 mt-4 space-y-3">

      <h2 class="text-sm text-gray-300">Your Referrals</h2>

      <div
        v-for="r in data.referrals"
        :key="r._id"
        class="bg-[#111C44] p-4 rounded-2xl flex justify-between items-center"
      >
        <div>
          <p class="font-medium">{{ r.name }}</p>
          <p class="text-xs text-gray-400">
            Joined {{ new Date(r.createdAt).toDateString() }}
          </p>
        </div>

<div class="flex items-center gap-1 text-green-400 font-semibold">
  <img
    :src="TaskNovaCoin"
    alt="TaskNova Coin"
    class="w-4 h-4 rounded-full"
  />

  <span>+20</span>
</div>
      </div>

    </div>



    <BottomNav />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BottomNav from '@/components/BottomNav.vue'
import referralService from '@/services/referralService'
import { useAuthStore } from '@/stores/auth'
import TaskNovaCoin from '@/assets/images/TaskNovaCoin.png'

const authStore = useAuthStore()
// const copying = ref(false)
const copyState = ref('idle')

const data = ref({
  referrals: [],
  totalReferrals: 0,
  totalEarned: 0
})

onMounted(async () => {
  const res = await referralService.getReferrals()
  data.value = res
})

const refLink = computed(() => {
  return `${window.location.origin}/register?ref=${authStore.user?.referralCode}`
})

const copyLink = async () => {
  try {
    copyState.value = 'loading'

    await navigator.clipboard.writeText(refLink.value)

    copyState.value = 'success'

    setTimeout(() => {
      copyState.value = 'idle'
    }, 2000)

  } catch {
    copyState.value = 'idle'
  }
}
</script>
