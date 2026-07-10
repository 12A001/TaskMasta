<script setup>
import { useNotificationStore } from '@/stores/notificationStore'
import { useRouter } from 'vue-router'
import { ArrowLeft, Check, Bell } from 'lucide-vue-next'

const router = useRouter()
const store = useNotificationStore()


const goBack = () => {
  router.back()
}

const markAsRead = (id) => {
  store.markAsRead(id)
}
</script>

<template>
  <div class="min-h-screen bg-[#071028] text-white">

    <!-- HEADER -->
    <div
      class="sticky top-0 z-50 bg-[#050B2A] border-b border-white/5 px-4 py-4"
    >
      <div class="flex items-center justify-between">

        <div class="flex items-center gap-3">
          <button
            @click="goBack"
            class="w-10 h-10 rounded-full bg-[#111C44] flex items-center justify-center"
          >
            <ArrowLeft class="w-5 h-5" />
          </button>

          <div>
            <h1 class="font-bold text-lg">
              Notifications
            </h1>

            <p class="text-xs text-gray-400">
              {{ store.unreadCount }} unread
            </p>
          </div>
        </div>

        <div
          class="w-10 h-10 rounded-full bg-[#7C3AED] flex items-center justify-center"
        >
          <Bell class="w-5 h-5 text-white" />
        </div>

      </div>
    </div>

    <!-- EMPTY -->
    <div
      v-if="store.notifications.length === 0"
      class="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <Bell class="w-16 h-16 text-purple-500 mb-4" />

      <h2 class="font-semibold text-lg">
        No Notifications Yet
      </h2>

      <p class="text-gray-400 text-sm mt-2">
        Notifications about upgrades, earnings and rewards will appear here.
      </p>
    </div>

    <!-- LIST -->
    <div
      v-else
      class="p-4 space-y-3"
    >
      <div
        v-for="n in store.notifications"
        :key="n._id"
        class="rounded-3xl border border-white/5 p-4 transition-all duration-200"
        :class="
          n.read
            ? 'bg-[#111C44]'
            : 'bg-gradient-to-r from-[#7C3AED]/20 to-[#A855F7]/10 border-purple-500/30'
        "
      >
        <div class="flex justify-between items-start gap-3">

          <div class="flex-1">

            <div class="flex items-center gap-2">
              <div
                v-if="!n.read"
                class="w-2 h-2 rounded-full bg-green-400"
              />

              <h3 class="font-semibold">
                {{ n.title }}
              </h3>
            </div>

            <p class="text-sm text-gray-300 mt-2">
              {{ n.message }}
            </p>

            <p class="text-xs text-gray-500 mt-3">
              {{ new Date(n.createdAt).toLocaleString() }}
            </p>
          </div>

          <button
            v-if="!n.read"
            @click="markAsRead(n._id)"
            class="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <Check class="w-5 h-5 text-green-400" />
          </button>

        </div>
      </div>
    </div>

  </div>
</template>
