// src/stores/task.js
import { defineStore } from 'pinia'
import taskService from '@/services/taskService'
import userService from '../services/userService'

export const useTaskStore = defineStore('task', {
state: () => ({
  loading: false,

  dailyGoal: 10,        // total goal (10)
  taskUnit: 2,          // 1 video = 2 tasks

  completedTasks: 0,    // 0 → 2 → 4 → 6 → 8 → 10

  completedToday: [],   // ⚠️ kept (backend support still allowed)
  tasks: [],
  featuredTask: null,
  weeklyTaskHistory: [], // For dashboard insights
}),

getters: {

  // progress bar
  goalPercentage: (state) => {
    if (!state.dailyGoal) return 0
    return Math.min((state.completedTasks / state.dailyGoal) * 100, 100)
  },

  // video conversion
  videosCompleted: (state) => {
    return state.completedTasks / 2
  },

  isGoalComplete: (state) =>
    state.completedTasks >= state.dailyGoal,

  /**
   * ✅ SAFE TODAY FILTER (NEW FIX)
   * - Uses backend data if correct
   * - Falls back to local filtering if backend is wrong
   */
  computedCompletedToday: (state) => {
    const today = new Date().toDateString()

    // If backend already provides good data, use it
    if (Array.isArray(state.completedToday) && state.completedToday.length) {
      return state.completedToday
    }

    // fallback: compute from tasks (safe mode)
    return state.tasks.filter(task => {
      return (
        task.completed &&
        task.completedAt &&
        new Date(task.completedAt).toDateString() === today
      )
    })
  }
},

actions: {

async fetchAll() {
  try {
    this.loading = true

    const [taskData, userData] = await Promise.all([
      taskService.getTasks(),
      userService.getStats()
    ])

    this.dailyGoal = taskData.dailyGoal || 10
    this.completedTasks = taskData.completedTasks || 0
    this.tasks = taskData.tasks || []

    // ⚠️ SAFE ASSIGNMENT (no crash if backend wrong)
    this.completedToday = Array.isArray(taskData.completedToday)
      ? taskData.completedToday
      : []

    this.weeklyTaskHistory = userData.weeklyTaskHistory || []
    this.featuredTask = this.tasks[0] || null

  } catch (error) {
    console.error('Failed to fetch all data:', error)
  } finally {
    this.loading = false
  }
},

async completeVideo(code) {
  try {
    const result = await taskService.completeVideoTask(code)

    if (result.success) {
      // ONLY TRUST BACKEND (UNCHANGED LOGIC)
      this.completedTasks =
        result.dailyGoalProgress ?? result.completedTasks

      // optional sync (safe update only)
      if (result.completedToday) {
        this.completedToday = result.completedToday
      }
    }

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
},

async refreshProgress() {
  try {
    const { data } = await taskService.refreshTaskProgress()

    this.completedTasks =
      data.completedTasks || this.completedTasks

    // SAFE SYNC (no overwrite risk)
    if (Array.isArray(data.completedToday)) {
      this.completedToday = data.completedToday
    }

  } catch (error) {
    console.error(error)
  }
},

}
})
