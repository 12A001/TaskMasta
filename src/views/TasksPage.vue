<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
import TaskNovaCoin from '@/assets/images/TaskNovaCoin.png'
import { useTaskStore } from '@/stores/task'

const router = useRouter()
const taskStore = useTaskStore()

const activeTab = ref('all')

/**
 * STORE DATA
 */
const tasks = computed(() => taskStore.tasks)

/**
 *  ADDED: TASK LIMIT CHECK
 */
const isTaskLimitReached = computed(() => {
  return taskStore.completedTasks >= taskStore.dailyGoal
})

/**
 * INIT
 */
onMounted(() => {
  taskStore.fetchAll()
})

const fallbackImg = '/fallback-video.png'

const onImgError = (e) => {
  e.target.src = fallbackImg
}

/**
 * TASK FILTERING
 */
const filteredTasks = computed(() => {
  if (activeTab.value === 'all') return tasks.value

  if (activeTab.value === 'completed') {
    return tasks.value.filter(t => t.completed === true)
  }

  if (activeTab.value === 'video') {
    return tasks.value.filter(t => t.type === 'video')
  }

  return tasks.value
})

const openTask = (id) => {
  router.push(`/tasks/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-[#050B2A] text-white pb-24">

    <!-- HEADER -->
    <div class="px-4 py-3 sticky top-0 z-50 bg-[#050B2A]/90 backdrop-blur-md border-b border-white/5">
      <h1 class="text-center text-lg font-semibold">
        Daily Tasks
      </h1>
    </div>

    <!--  ADDED: LIMIT MESSAGE -->
    <div
      v-if="isTaskLimitReached"
      class="bg-red-500/10 text-red-400 p-3 rounded-xl mx-4 mt-3"
    >
      Daily task limit reached. Come back tomorrow.
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-10 text-gray-400">
      Loading tasks...
    </div>

    <!-- TASK LIST -->
    <div
      v-for="task in filteredTasks"
      :key="task._id"
      class="bg-[#050B2A] border border-white/5 rounded-2xl p-3 mt-3 mb-3"
    >
      <div class="flex items-center gap-3">

        <!-- THUMBNAIL -->
        <div class="relative flex-shrink-0">
          <img
            :src="task.thumbnail || fallbackImg"
            class="w-28 h-20 rounded-xl object-cover"
            @error="onImgError"
          />

          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
              ▶
            </div>
          </div>
        </div>

        <!-- DETAILS -->
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-sm leading-5 line-clamp-2">
            {{ task.title }}
          </h4>

          <div class="flex items-center gap-2 mt-1 text-xs text-gray-400">
            <span>📺 YouTube</span>
            <span>•</span>
            <span>{{ task.duration }}</span>
          </div>

          <p class="text-xs text-gray-500 mt-1 line-clamp-1">
            Watch the full video and submit the code
          </p>
        </div>

        <!-- RIGHT SIDE -->
        <div class="flex flex-col items-end justify-between h-20">
          <div>
            <p class="text-[10px] text-gray-400 text-right">
              Reward
            </p>

            <div class="flex items-center gap-1">
              <span class="font-bold text-lg">
                {{ task.reward }}
              </span>

              <img
                :src="TaskNovaCoin"
                class="w-4 h-4 rounded-full"
              />
            </div>
          </div>

          <!--  UPDATED BUTTON -->
          <button
            @click="openTask(task._id)"
            :disabled="isTaskLimitReached"
            :class="[
              'px-4 py-2 rounded-xl text-xs font-medium',
              isTaskLimitReached
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#7C3AED] to-[#9333EA]'
            ]"
          >
            Start Task
          </button>
        </div>

      </div>
    </div>

    <BottomNav />
  </div>
</template>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
