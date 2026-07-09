<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TaskNovaCoin from '@/assets/images/TaskNovaCoin.png'

import { useTaskStore } from '@/stores/task'
import { useAuthStore } from '@/stores/auth'
import { useWalletStore } from '@/stores/wallet' //  FIXED

import taskService from '@/services/taskService'

const taskStore = useTaskStore()
const authStore = useAuthStore()
const walletStore = useWalletStore() //  FIXED

const route = useRoute()
const router = useRouter()

const task = ref(null)
const player = ref(null)

const watchedPercent = ref(0)
const codeUnlocked = ref(false)
const secretCode = ref('')
const rewardClaimed = ref(false)
const claiming = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')

let interval = null
let lastSentPercent = 0

// --------------------
// YOUTUBE LOADER
// --------------------
function loadYouTubeAPI() {
  return new Promise((resolve) => {
    if (window.YT) return resolve(window.YT)

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => resolve(window.YT)
  })
}

// --------------------
// CREATE PLAYER
// --------------------
async function createPlayer() {
  if (!task.value) return

  const YT = await loadYouTubeAPI()

  player.value = new YT.Player('youtube-player', {
    videoId: task.value.youtubeVideoId,

    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      playsinline: 1,
    },

    events: {
      onReady: (event) => {
        event.target.playVideo()
        startTracking()
      },
      onError: (event) => {
        console.log('YouTube Error:', event.data)
      },
    },
  })
}

// --------------------
// TRACK WATCH PROGRESS
// --------------------
function startTracking() {
  interval = setInterval(() => {
    if (!player.value?.getDuration) return

    const duration = player.value.getDuration()
    const current = player.value.getCurrentTime()

    if (!duration) return

    const percent = Math.floor((current / duration) * 100)
    watchedPercent.value = Math.max(watchedPercent.value, percent)

    if (percent >= 95 && !codeUnlocked.value) {
      codeUnlocked.value = true
    }

    sendProgress()
  }, 3000)
}

// --------------------
// SEND PROGRESS
// --------------------
async function sendProgress() {
  const payload = {
    taskId: task.value?._id,
    userId: authStore.user?._id,
    watchedPercent: watchedPercent.value,
  }

  if (!payload.taskId || !payload.userId) return
  if (watchedPercent.value === lastSentPercent) return

  try {
    const res = await taskService.updateTaskProgress(payload)

    lastSentPercent = watchedPercent.value

    if (res.unlocked && res.secretCode) {
      secretCode.value = res.secretCode
      codeUnlocked.value = true
    }
  } catch (err) {
    console.error('Progress sync failed:', err.response?.data || err.message)
  }
}

// --------------------
// CLAIM REWARD (FIXED + CLEAN)
// --------------------
async function claimReward() {
  try {
    if (!task.value?._id || !authStore.user?._id) return

    claiming.value = true

    const res = await taskService.verifyTask({
      taskId: task.value._id,
      userId: authStore.user._id,
      code: secretCode.value,
    })

    //  success UI (no alert)
    successMessage.value = `+${res.reward} coins earned 🎉`
    showSuccess.value = true

    setTimeout(() => {
      showSuccess.value = false
    }, 2500)

    rewardClaimed.value = true
    codeUnlocked.value = false
    secretCode.value = ''

    await walletStore.fetchBalance()
    await authStore.fetchProfile()

    router.push('/tasks')
  } catch (err) {
    console.error('Claim failed:', err.response?.data || err.message)
    successMessage.value = err.response?.data?.message || 'Invalid code'
    showSuccess.value = true

    setTimeout(() => {
      showSuccess.value = false
    }, 2500)
  } finally {
    claiming.value = false
  }
}

// --------------------
// INIT
// --------------------
onMounted(async () => {
  await taskStore.fetchAll()

  task.value = taskStore.tasks.find((t) => t._id === route.params.id)

  if (!task.value) {
    router.push('/tasks')
    return
  }

  if (!authStore.user) {
    await authStore.fetchProfile()
  }

  await nextTick()
  createPlayer()
})

// --------------------
// CLEANUP
// --------------------
onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <!-- TOP BAR -->
    <div
      class="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur px-4 py-3 flex items-center"
    >
      <button @click="router.back()" class="text-sm text-purple-400">← Back</button>

      <h1 class="flex-1 text-center text-sm font-semibold">Task Player</h1>

      <span class="text-xs text-gray-400"> {{ watchedPercent }}% </span>
    </div>

    <!-- LOADING -->
    <div v-if="!task" class="h-screen flex items-center justify-center text-gray-400">
      Loading task...
    </div>

    <!-- PLAYER -->
    <div v-else class="pt-14">
      <!-- FULL SCREEN VIDEO -->
      <div class="w-full h-[calc(100vh-56px)] bg-black">
        <div id="youtube-player" class="w-full h-full"></div>
      </div>

      <!-- OVERLAY INFO (only when needed) -->
      <div class="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur p-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-semibold text-sm">
              {{ task.title }}
            </h2>

            <p class="text-xs text-gray-400">
              {{ task.description }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="font-bold">
              {{ task.reward }}
            </span>
            <img
              :src="TaskNovaCoin"
              alt="TaskNova Coin"
              class="w-5 h-5 rounded-full object-cover"
            />
          </div>
        </div>

        <!-- PROGRESS BAR -->
        <div class="w-full h-1 bg-gray-800 rounded mt-3 overflow-hidden">
          <div
            class="h-full bg-purple-500 transition-all"
            :style="{ width: watchedPercent + '%' }"
          ></div>
        </div>

        <!-- SECRET CODE -->
        <div v-if="codeUnlocked && task" class="mt-3">
          <p v-if="rewardClaimed" class="text-green-400 text-xs mb-2">Reward already claimed 🎉</p>
          <p class="text-xs text-green-400 mb-2">✓ 95% reached — enter code to claim reward</p>

          <input
            v-model="secretCode"
            placeholder="Enter secret code"
            class="w-full p-3 rounded bg-[#111] outline-none text-sm"
          />

          <button
            @click="claimReward"
            :disabled="claiming"
            class="w-full mt-2 py-2 rounded font-medium flex items-center justify-center gap-2"
            :class="claiming ? 'bg-green-800 opacity-70' : 'bg-green-600'"
          >
            <span
              v-if="claiming"
              class="animate-spin border-2 border-white border-t-transparent w-4 h-4 rounded-full"
            ></span>

            <span>
              {{ claiming ? 'Processing...' : 'Claim Reward' }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- SUCCESS TOAST -->
<div
  v-if="showSuccess"
  class="fixed top-20 left-1/2 -translate-x-1/2 z-[999] animate-bounce"
>
  <div class="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
    {{ successMessage }}
  </div>
</div>
</template>
