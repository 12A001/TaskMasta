<script setup>
import BottomNav from '@/components/BottomNav.vue'
import FloatingWidget from '@/components/FloatingWidget.vue'
import TaskNovaCoin from '@/assets/images/TaskNovaCoin.png'
import PlanBadge from '@/components/PlanBadge.vue'

import { ShieldCheck, Crown, ClipboardList, Users, User, Bell } from 'lucide-vue-next' //PlayCircle, ChevronRight

import { storeToRefs } from 'pinia'
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '@/stores/dashboard'
import { useWalletStore } from '@/stores/wallet'
import { useTaskStore } from '@/stores/task'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notificationStore'

const router = useRouter()
const dashboardStore = useDashboardStore()
const taskStore = useTaskStore()
const authStore = useAuthStore()
const notificationStore = useNotificationStore()

const { user } = storeToRefs(authStore)
const { referralMessages } = storeToRefs(dashboardStore)
const { completedTasks, dailyGoal, goalPercentage, computedCompletedToday } = storeToRefs(taskStore)

const currentInviteIndex = ref(0)
const walletStore = useWalletStore()
// const { balance, todayEarnings } = storeToRefs(walletStore)
let interval = null

onMounted(async () => {
  dashboardStore.fetchDashboard()

  // load wallet immediately (non-blocking UI)
  walletStore.fetchBalance()

  // start live sync (keeps balance fresh)
  walletStore.startAutoSync(15000)

  interval = setInterval(() => {
    if (!referralMessages.value?.length) return

    currentInviteIndex.value = (currentInviteIndex.value + 1) % referralMessages.value.length
  }, 3000)
})

onUnmounted(() => {
  clearInterval(interval)
  walletStore.stopAutoSync()
})

const userInitial = computed(() => {
  const name = user.value?.name?.trim()

  if (!name) return ''

  return name.charAt(0).toUpperCase()
})
const goProfile = () => {
  router.push('/profile')
}

const openNotifications = () => {
  router.push('/notifications')
}

// COMING SOON, NEW FEATURE

// const goalPercentage = computed(() => {
//   if (!stats.value?.dailyGoal) return 0

//   return Math.min((stats.value.completedTasks / stats.value.dailyGoal) * 100, 100)
// })
// const completedToday = computed(() => {
//   return stats.value?.completedToday || []
// })

const COIN_RATE = 70

// FORMATTER (NEW)
const formatCoins = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const balanceCoins = computed(() => Number(walletStore.balance || 0))

const balanceNaira = computed(() => balanceCoins.value * COIN_RATE)

const todayCoins = computed(() => Number(walletStore.todayEarnings || 0))

const todayNaira = computed(() => todayCoins.value * COIN_RATE)

const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

const openSupport = () => {
  router.push('/support')
}

const goTasks = () => {
  router.push('/tasks')
}

const goRewards = () => {
  router.push('/referral')
}
const goUpgrade = () => {
  router.push('/upgrade')
}
</script>

<template>
  <div class="min-h-screen bg-[#050B2A] text-white pb-24">
    <!-- HEADER -->
    <div
      class="sticky top-0 z-50 bg-[#050B2A] border-b border-white/5 px-4 pt-5 pb-3"
    >
      <div class="p-2 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            @click="goProfile"
            class="w-12 h-12 cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <!-- User uploaded image -->
            <img
              v-if="user?.avatar"
              :src="user.avatar"
              class="w-12 h-12 rounded-full object-cover border border-white/10"
              alt="Profile"
            />

            <!-- First letter -->
            <div
              v-else-if="userInitial"
              class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-white font-bold text-lg border border-white/10"
            >
              {{ userInitial }}
            </div>

            <!-- Default icon -->
            <div
              v-else
              class="w-12 h-12 rounded-full bg-[#111C44] flex items-center justify-center border border-white/10"
            >
              <User class="w-6 h-6 text-gray-400" />
            </div>
          </button>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-semibold text-white">
                {{ user?.name || 'User' }}
                <PlanBadge :plan="user?.plan" />
              </h2>
            </div>

            <p class="text-xs text-[#9CA3AF]">Complete tasks and earn rewards</p>
          </div>
        </div>

        <button
          @click="openNotifications"
          class="relative w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center"
        >
          <Bell class="w-5 h-5 text-white" />

          <!-- Badge -->
          <span
            v-if="notificationStore.unreadCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
          >
            {{ notificationStore.unreadCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- DAILY GOAL -->
    <div class="px-4 mt-4">
      <div
        class="bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] rounded-3xl p-5 relative overflow-hidden"
      >
        <!-- Shine animation -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"
        ></div>

        <!-- HEADER -->
        <div class="flex justify-between items-center relative z-10">
          <div class="flex items-center gap-2">
            <div
              class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <ShieldCheck class="w-4 h-4 text-black" />
            </div>
            <span class="text-sm font-medium">Daily Goal</span>
          </div>

          <div class="text-xs bg-white/20 px-3 py-1 rounded-full font-mono tracking-wider">
            Resets 12:00 AM
          </div>
        </div>

        <!-- COUNTER -->
        <h2 class="text-3xl font-bold mt-5 text-white tracking-tighter tabular-nums">
          {{ completedTasks }}/{{ dailyGoal }}
        </h2>

        <p class="text-sm text-white/70 -mt-1">Tasks Progress (+2 per video)</p>

        <!-- PROGRESS BAR -->
        <div class="mt-6 relative h-3 bg-white/20 rounded-3xl overflow-hidden shadow-inner">
          <!-- Glow layer -->
          <div
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 rounded-3xl transition-all duration-700 ease-out shadow-[0_0_20px_#10b981]"
            :style="{ width: `${goalPercentage}%` }"
          ></div>

          <!-- Main bar -->
          <div
            class="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 rounded-3xl transition-all duration-700 ease-out relative"
            :style="{ width: `${goalPercentage}%` }"
          >
            <!-- sparkle -->
            <div
              class="absolute inset-0 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[length:18px_18px] animate-sparkle"
            ></div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="flex justify-between text-xs mt-2 text-white/60 font-medium">
          <span></span>
          <span class="text-green-300 font-semibold"> {{ completedTasks }}/10 COMPLETED </span>
        </div>
      </div>
    </div>

    <!-- STATS -->
    <div class="grid grid-cols-2 gap-3 px-4 mt-4">
      <!-- BALANCE -->
      <div class="bg-[#111C44] rounded-3xl p-4">
        <p class="text-[#9CA3AF] text-xs">Your Balance</p>

        <div class="flex items-center gap-1 mt-2">
          <h2 class="text-2xl font-bold">
            {{ formatCoins(balanceCoins) }}
          </h2>

          <img :src="TaskNovaCoin" alt="TaskNova Coin" class="w-7 h-7 rounded-full object-cover" />
        </div>

        <p class="text-green-400 text-sm mt-2">≈ ₦{{ formatNaira(balanceNaira) }}</p>
      </div>

      <!-- TODAY EARNINGS -->
      <div class="bg-[#111C44] rounded-3xl p-4">
        <p class="text-[#9CA3AF] text-xs">Today's Earnings</p>

        <div class="flex items-center gap-2 mt-2">
          <h2 class="text-2xl font-bold">
            {{ formatCoins(todayCoins) }}
          </h2>
          <img :src="TaskNovaCoin" alt="TaskNova Coin" class="w-7 h-7 rounded-full object-cover" />
        </div>

        <p class="text-green-400 text-sm mt-2">≈ ₦{{ formatNaira(todayNaira) }}</p>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="grid grid-cols-3 gap-3 px-4 mt-4">
      <button @click="goTasks" class="bg-[#111C44] rounded-2xl py-4 flex flex-col items-center">
        <ClipboardList class="w-5 h-5 text-purple-400" />
        <span class="text-xs mt-2">Daily Tasks</span>
      </button>

      <button
        @click="goUpgrade"
        class="bg-[#111C44] rounded-2xl py-4 flex flex-col items-center active:scale-[0.98] transition"
      >
        <Crown class="w-5 h-5 text-blue-400" />
        <span class="text-xs mt-2">Upgrade</span>
      </button>

      <button @click="goRewards" class="bg-[#111C44] rounded-2xl py-4 flex flex-col items-center">
        <Users class="w-5 h-5 text-red-400" />
        <span class="text-xs mt-2">Referrals</span>
      </button>
    </div>

    <!-- REFERRAL SLIDER -->
    <div v-if="referralMessages?.length" class="px-4 mt-5">
      <div class="relative overflow-hidden rounded-3xl">
        <div
          class="flex transition-transform duration-500"
          :style="{
            transform: `translateX(-${currentInviteIndex * 100}%)`,
          }"
        >
          <div
            v-for="(msg, index) in referralMessages"
            :key="index"
            class="min-w-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] p-5"
          >
            {{ msg }}
          </div>
        </div>
      </div>
    </div>

    <!-- TODAY COMPLETED TASKS -->
    <div class="px-4 mt-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="font-semibold">Today's Completed Tasks</h3>

        <span class="text-xs text-[#9CA3AF]"> {{ computedCompletedToday.length }} Completed </span>
      </div>

      <!-- EMPTY -->
      <div v-if="!computedCompletedToday.length" class="bg-[#111C44] rounded-2xl p-5 text-center">
        <ClipboardList class="w-8 h-8 mx-auto text-[#7C3AED]" />

        <p class="mt-3 text-sm text-gray-400">No completed tasks today</p>
      </div>

      <!-- COMPLETED TASKS -->
      <div
        v-for="task in computedCompletedToday"
        :key="task._id"
        class="bg-[#111C44] rounded-2xl p-3 mb-3"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img
              v-if="task.thumbnail"
              :src="task.thumbnail"
              class="w-14 h-14 rounded-xl object-cover"
            />

            <div>
              <h4 class="text-sm font-medium">
                {{ task.title }}
              </h4>

              <p class="text-xs text-green-400 mt-1">Completed Successfully</p>
            </div>
          </div>

          <div class="flex items-center gap-1 text-yellow-400">
            <img :src="TaskNovaCoin" class="w-5 h-5 rounded-full" />

            <span class="font-semibold">
              {{ task.reward }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <BottomNav />
  </div>

  <FloatingWidget
    text="👋 Hi, I'm Karen"
    subText="Need help?"
    :image="'https://i.pravatar.cc/150?img=32'"
    :action="openSupport"
  />
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
@keyframes shine {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(400%);
  }
}
.animate-shine {
  animation: none;
}

@keyframes sparkle {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}
.animate-sparkle {
  animation: none;
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
