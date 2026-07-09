<script setup>
import { computed } from 'vue'

const props = defineProps({
  plan: {
    type: String,
    default: 'normal',
  },
})

const isVerified = computed(() =>
  ['premium', 'super'].includes(props.plan?.toLowerCase())
)

const badgeColor = computed(() => {
  switch (props.plan?.toLowerCase()) {
    case 'super':
      return '#F59E0B' // gold

    case 'premium':
      return '#1877F2' // Facebook blue

    default:
      return '#64748B'
  }
})
</script>

<template>
  <div
    v-if="isVerified"
    class="relative inline-flex items-center justify-center"
  >
    <!-- subtle glow -->
    <div
      class="absolute inset-0 blur-md opacity-40 animate-pulse"
      :style="{ color: badgeColor }"
    >
      ●
    </div>

    <!-- Facebook style badge -->
    <svg
      class="w-5 h-5 relative z-10 animate-badge"
      viewBox="0 0 24 24"
      fill="none"
    >
      <!-- Facebook-like verification shape -->
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

      <!-- White check -->
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
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-1px);
  }

  100% {
    transform: translateY(0px);
  }
}

.animate-badge {
  animation: badgeFloat 2s ease-in-out infinite;
}
</style>
