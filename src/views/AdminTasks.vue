<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminTaskStore } from '@/stores/adminTaskStore'
import TaskNovaCoin from '@/assets/images/TaskNovaCoin.png'

const taskStore = useAdminTaskStore()
const { tasks, loading } = storeToRefs(taskStore)

const form = ref({
  title: '',
  youtubeVideoId: '',
  reward: 0,
  tier: 'low',
  secretCode: '',
  duration: '',
  description: '',
  active: true
})

onMounted(() => {
  taskStore.fetchTasks()
})

const createTask = async () => {
  await taskStore.createTask(form.value)

  form.value = {
    title: '',
    youtubeVideoId: '',
    reward: 0,
    tier: 'low',
    secretCode: '',
    duration: '',
    description: '',
    active: true
  }
}

const deleteTask = (id) => taskStore.deleteTask(id)

const toggleTask = (task) => {
  taskStore.updateTask(task._id, {
    ...task,
    active: !task.active
  })
}
</script>

<template>
  <div class="min-h-screen bg-[#070B1A] text-white p-6">

    <!-- HEADER -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p class="text-sm text-gray-400">Manage tasks and video rewards</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <!-- CREATE TASK -->
      <div class="bg-[#111C44] rounded-2xl p-5 space-y-3 border border-white/5">

        <h2 class="text-lg font-semibold mb-2">Create Task</h2>

        <input v-model="form.title" placeholder="Task title"
          class="w-full p-3 rounded-lg bg-[#0B1020] outline-none focus:ring-2 focus:ring-purple-500" />

        <input v-model="form.youtubeVideoId" placeholder="YouTube Video ID"
          class="w-full p-3 rounded-lg bg-[#0B1020] outline-none focus:ring-2 focus:ring-purple-500" />

        <div class="grid grid-cols-2 gap-2">
          <input v-model="form.reward" type="number" placeholder="Reward"
            class="p-3 rounded-lg bg-[#0B1020] outline-none focus:ring-2 focus:ring-purple-500" />

          <select v-model="form.tier"
            class="p-3 rounded-lg bg-[#0B1020] outline-none">
            <option value="low">Low Tier</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <input v-model="form.secretCode" placeholder="Secret Code"
          class="w-full p-3 rounded-lg bg-[#0B1020] outline-none focus:ring-2 focus:ring-purple-500" />

        <input v-model="form.duration" placeholder="Duration (e.g. 30s)"
          class="w-full p-3 rounded-lg bg-[#0B1020] outline-none focus:ring-2 focus:ring-purple-500" />

        <textarea v-model="form.description" placeholder="Description"
          class="w-full p-3 rounded-lg bg-[#0B1020] outline-none h-24 resize-none"></textarea>

        <button
          @click="createTask"
          class="w-full py-3 rounded-lg cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold hover:opacity-90 transition">
          Create Task
        </button>

      </div>

      <!-- TASK LIST -->
      <div class="lg:col-span-2 space-y-4">

        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">All Tasks</h2>
          <span class="text-xs text-gray-400">{{ tasks.length }} tasks</span>
        </div>

        <div v-if="loading" class="text-gray-400">
          Loading tasks...
        </div>

        <!-- TASK CARDS -->
        <div
          v-for="task in tasks"
          :key="task._id"
          class="bg-[#111C44] border border-white/5 rounded-2xl p-4 flex justify-between items-center hover:bg-[#131A33] transition"
        >

          <!-- LEFT -->
<div>
  <p class="font-semibold">{{ task.title }}</p>

  <div class="text-xs text-gray-400 mt-1 flex items-center gap-2">
    
    <span class="uppercase">{{ task.tier }}</span>

    <span>•</span>

    <div class="flex items-center gap-1">
      <img
        :src="TaskNovaCoin"
        alt="TaskNova Coin"
        class="w-3 h-3 rounded-full object-cover"
      />

      <span>{{ task.reward }}</span>
    </div>

  </div>
</div>

          <!-- ACTIONS -->
          <div class="flex gap-2">

            <button
              @click="toggleTask(task)"
              class="px-3 py-1 text-xs rounded-lg bg-[#1F2937] hover:bg-[#374151] transition"
            >
              {{ task.active ? 'Disable' : 'Enable' }}
            </button>

            <button
              @click="deleteTask(task._id)"
              class="px-3 py-1 text-xs rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>
