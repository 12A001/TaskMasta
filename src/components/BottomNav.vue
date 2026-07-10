<script setup>
import { House, ListTodo, Trophy, Wallet, User } from 'lucide-vue-next'

const navItems = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: House,
  },
  {
    name: 'Tasks',
    path: '/tasks',
    icon: ListTodo,
  },
 {
  name: 'Leaderboard',
  path: '/leaderboard',
  icon: Trophy,
},
  {
    name: 'Wallet',
    path: '/wallet',
    icon: Wallet,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: User,
  },
]
</script>

<template>
<nav
  class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 border-t border-white/10 bg-[#050B2A]/95 backdrop-blur-md"
>
    <div class="grid grid-cols-5 h-16">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button
          @click="navigate"
          class="relative flex flex-col items-center justify-center gap-1 transition-all duration-200 w-full h-full"
        >
          <!-- Active Indicator -->
          <div v-if="isActive" class="absolute top-0 w-8 h-1 rounded-full bg-[#A855F7]" />

          <!-- Icon -->
          <component
            :is="item.icon"
            :size="20"
            :stroke-width="2"
            :class="isActive ? 'text-[#A855F7]' : 'text-[#9CA3AF]'"
          />

          <!-- Label -->
          <span
            class="text-[11px] font-medium"
            :class="isActive ? 'text-[#A855F7]' : 'text-[#9CA3AF]'"
          >
            {{ item.name }}
          </span>
        </button>
      </RouterLink>
    </div>
  </nav>
</template>
