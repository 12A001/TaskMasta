<script setup>
import { computed } from 'vue'

const props = defineProps({
  plan: {
    type: String,
    default: 'free'
  }
})

// Only paid plans have badges
const isVerified = computed(() => props.plan?.toLowerCase() !== 'free')

const badgeColor = computed(() => {
  switch (props.plan?.toLowerCase()) {
    case 'starter':
      return '#22C55E' // Green

    case 'bronze':
      return '#B45309' // Bronze

    case 'silver':
      return '#94A3B8' // Silver

    case 'gold':
      return '#FACC15' // Gold

    case 'platinum':
      return '#06B6D4' // Cyan

    case 'diamond':
      return '#3B82F6' // Blue

    case 'elite':
      return '#A855F7' // Purple

    default:
      return '#64748B'
  }
})

const glowColor = computed(() => {
  switch (props.plan?.toLowerCase()) {
    case 'starter':
      return 'rgba(34,197,94,.55)'

    case 'bronze':
      return 'rgba(180,83,9,.55)'

    case 'silver':
      return 'rgba(148,163,184,.55)'

    case 'gold':
      return 'rgba(250,204,21,.6)'

    case 'platinum':
      return 'rgba(6,182,212,.6)'

    case 'diamond':
      return 'rgba(59,130,246,.65)'

    case 'elite':
      return 'rgba(168,85,247,.7)'

    default:
      return 'rgba(100,116,139,.4)'
  }
})
</script>

<template>
  <div
    v-if="isVerified"
    class="relative inline-flex items-center justify-center"
  >
    <!-- Glow -->
    <div
      class="absolute inset-0 rounded-full blur-md opacity-80 animate-pulse"
      :style="{ background: glowColor }"
    />

    <!-- Badge -->
    <svg
      class="w-5 h-5 relative z-10 animate-badge"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 1.8
        L14.1 3.2
        L16.7 2.9
        L18.2 5
        L20.8 5.8
        L20.9 8.5
        L22.7 10.5
        L21.4 13
        L22.1 15.6
        L20 17.2
        L19.5 19.8
        L16.8 20.1
        L15 22
        L12.5 21
        L10 22
        L8.2 20.1
        L5.5 19.8
        L5 17.2
        L2.9 15.6
        L3.6 13
        L2.3 10.5
        L4.1 8.5
        L4.2 5.8
        L6.8 5
        L8.3 2.9
        L10.9 3.2
        Z"
        :fill="badgeColor"
      />

      <path
        d="M10.4 15.6L7.8 13L6.4 14.4L10.4 18.4L17.8 11L16.4 9.6L10.4 15.6Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<style scoped>
@keyframes badgeFloat {
  0% {
    transform: translateY(0px) scale(1);
  }

  50% {
    transform: translateY(-2px) scale(1.05);
  }

  100% {
    transform: translateY(0px) scale(1);
  }
}

.animate-badge {
  animation: badgeFloat 2s ease-in-out infinite;
}
</style>
