<script setup>
import { onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notificationStore'

const authStore = useAuthStore()
const notifications = useNotificationStore()

onMounted(async () => {
  // load user first if needed
  if (authStore.token && !authStore.user) {
    await authStore.fetchProfile()
  }

  // init notifications AFTER user is ready
  if (authStore.user?._id) {
    notifications.init(authStore.user._id)
  }
})

// OPTIONAL: handle case where user loads later
watch(
  () => authStore.user,
  (user) => {
    if (user?._id) {
      notifications.init(user._id)
    }
  }
)
</script>

<template>
  <router-view />
</template>
