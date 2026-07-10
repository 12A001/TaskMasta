<script setup>
import { ref, onMounted, computed } from 'vue'
import leaderboardService from '@/services/leaderboardService'
import authService from '@/services/authService'
import { Crown, ArrowLeft } from 'lucide-vue-next'
import TaskNovaCoin from '@/assets/images/TaskNovaCoin.png'
import PlanBadge from '@/components/PlanBadge.vue'

const loading = ref(false)
const users = ref([])
const currentUser = ref(null)

onMounted(async () => {
  loading.value = true

  try {
    const [leaderboardRes, profileRes] = await Promise.all([
      leaderboardService.getLeaderboard(),
      authService.getProfile(),
    ])

    users.value = leaderboardRes.data.leaderboard
    currentUser.value = profileRes.data.user
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const top3 = computed(() => users.value.slice(0, 3))
const others = computed(() => users.value.slice(3))

const isMe = (user) => user._id === currentUser.value?._id

const formatMoney = (amount) => Number(amount || 0).toLocaleString()

const initials = (name = '') =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
</script>

<template>
  <div class="min-h-screen bg-[#050B2A] text-white px-4 pt-6 pb-10">
    <!-- HEADER -->
    <div class="sticky top-0 z-50 bg-[#050B2A] border-b border-white/5 px-2 py-2">
      <div class="flex items-center justify-between">
        <!-- Back Button -->
        <button
          @click="$router.back()"
          class="p-2 rounded-full hover:bg-white/10 active:scale-95 transition"
        >
          <ArrowLeft class="w-6 h-6 text-white" />
        </button>

        <!-- Title -->
        <div class="flex flex-col items-center flex-1">
          <h1 class="text-xl font-bold">Leaderboard</h1>
          <p class="text-xs text-gray-400">Top Earners This Month</p>
        </div>

        <div class="w-10"></div>
      </div>
    </div>

    <!-- PODIUM -->
    <div v-if="top3.length" class="flex items-end justify-center gap-3 mt-9 mb-10">
      <!-- 2ND -->
      <div v-if="top3[1]" class="flex flex-col items-center w-[90px]">
        <div
          class="w-14 h-14 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center text-sm font-bold overflow-hidden border-2 border-gray-400"
        >
          <img v-if="top3[1].avatar" :src="top3[1].avatar" class="w-full h-full object-cover" />
          <span v-else>{{ initials(top3[1].name) }}</span>
        </div>

        <p class="text-xs mt-2 text-center truncate w-full">
          {{ top3[1].name }}
          <PlanBadge :plan="top3[1].plan" />
          <span v-if="isMe(top3[1])" class="text-yellow-400">(You)</span>
        </p>

        <div class="flex items-center justify-center gap-1 text-xs text-gray-300 font-semibold">
          <img :src="TaskNovaCoin" class="w-3.5 h-3.5 rounded-full" />
          <span>{{ formatMoney(top3[1].earnings) }}</span>
        </div>

        <div class="mt-2 w-full h-20 bg-gray-600 rounded-t-2xl flex items-center justify-center">
          <span class="font-bold">2</span>
        </div>
      </div>

      <!-- 1ST -->
      <div v-if="top3[0]" class="flex flex-col items-center w-[110px] -translate-y-5">
        <div class="relative">
          <div
            class="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center font-bold text-lg border-4 border-yellow-300 overflow-hidden"
          >
            <img v-if="top3[0].avatar" :src="top3[0].avatar" class="w-full h-full object-cover" />
            <span v-else>{{ initials(top3[0].name) }}</span>
          </div>

          <Crown class="w-6 h-6 text-yellow-300 absolute -top-3 left-1/2 -translate-x-1/2" />
        </div>

        <p class="text-sm mt-2 font-semibold text-center">
          {{ top3[0].name }}
          <PlanBadge :plan="top3[0].plan" />
          <span v-if="isMe(top3[0])" class="text-yellow-400">(You)</span>
        </p>

        <div class="flex items-center justify-center gap-1">
          <img :src="TaskNovaCoin" class="w-4 h-4 rounded-full" />
          <span>{{ formatMoney(top3[0].earnings) }}</span>
        </div>

        <div
          class="mt-2 w-full h-28 bg-yellow-500 rounded-t-2xl flex items-center justify-center shadow-lg"
        >
          <span class="text-lg font-bold">1</span>
        </div>
      </div>

      <!-- 3RD -->
      <div v-if="top3[2]" class="flex flex-col items-center w-[90px]">
        <div
          class="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-sm font-bold overflow-hidden border-2 border-orange-400"
        >
          <img v-if="top3[2].avatar" :src="top3[2].avatar" class="w-full h-full object-cover" />
          <span v-else>{{ initials(top3[2].name) }}</span>
        </div>

        <p class="text-xs mt-2 text-center truncate w-full">
          {{ top3[2].name }}
          <PlanBadge :plan="top3[2].plan" />
          <span v-if="isMe(top3[2])" class="text-yellow-400">(You)</span>
        </p>

        <div class="flex items-center justify-center gap-1 text-xs text-gray-300 font-semibold">
          <img :src="TaskNovaCoin" class="w-3.5 h-3.5 rounded-full" />
          <span>{{ formatMoney(top3[2].earnings) }}</span>
        </div>

        <div class="mt-2 w-full h-16 bg-orange-500 rounded-t-2xl flex items-center justify-center">
          <span class="font-bold">3</span>
        </div>
      </div>
    </div>

    <!-- LIST -->
    <div class="space-y-3">
      <div
        v-for="user in others"
        :key="user._id"
        class="flex items-center justify-between bg-[#0B1430] border border-[#1B2A5A] rounded-2xl p-3"
      >
        <div class="flex items-center gap-3">
          <!-- rank -->
          <div
            class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-gray-300"
          >
            {{ user.rank }}
          </div>

          <!-- avatar -->
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold overflow-hidden"
          >
            <img v-if="user.avatar" :src="user.avatar" class="w-full h-full object-cover" />
            <span v-else>{{ initials(user.name) }}</span>
          </div>

          <div class="flex items-center gap-2">
            <p class="text-sm font-medium">
              {{ user.name }}
              <span v-if="isMe(user)" class="text-yellow-400">(You)</span>
                <PlanBadge :plan="user.plan" />
            </p>


          </div>
        </div>

        <div class="flex items-center justify-end gap-1">
          <img :src="TaskNovaCoin" class="w-4 h-4 rounded-full" />
          <span class="text-sm font-bold text-white">
            {{ formatMoney(user.earnings) }}
          </span>
        </div>
      </div>
    </div>

    <!-- STATES -->
    <div v-if="loading" class="text-center text-gray-400 mt-10">Loading leaderboard...</div>

    <div v-if="!loading && users.length === 0" class="text-center text-gray-400 mt-10">
      No leaderboard data available
    </div>
  </div>
</template>
