import { defineStore } from 'pinia'
import socket from '@/services/socket'
import notificationService from '@/services/notificationService'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
  }),

  getters: {
    unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
  },

  actions: {
    async init(userId) {
      if (!userId) return

      // console.log('INIT NOTIFICATIONS FOR:', userId)

      this.notifications = await notificationService.getAll()

      socket.emit('join', userId)

      socket.on('notification:new', (notification) => {
        this.notifications.unshift(notification)

        // delay helps browser allow playback
        setTimeout(() => {
          this.playSound()
        }, 100)
      })
    },

    async markAsRead(id) {
      const n = this.notifications.find((n) => n._id === id)
      if (!n || n.read) return

      // 1. update backend first
      await notificationService.markAsRead(id)

      // 2. update frontend
      n.read = true
    },

    async markAllAsRead() {
      await Promise.all(
        this.notifications.filter((n) => !n.read).map((n) => notificationService.markAsRead(n._id)),
      )

      this.notifications.forEach((n) => {
        n.read = true
      })
    },

    async sendNotification(payload) {
      return await notificationService.create(payload)
    },

    playSound() {
      const audio = new Audio('/sounds/notify.mp3')
      audio.volume = 0.7
      audio.play().catch(() => {})
    },
  },
})
