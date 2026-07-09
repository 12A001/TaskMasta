<script setup>
import { ref, onBeforeUnmount } from 'vue'

defineProps({
  text: { type: String, default: "Hi 👋" },
  subText: { type: String, default: "Need help?" },
  image: { type: String, default: "https://i.pravatar.cc/150" },
  action: { type: Function, default: () => {} },
  pulse: { type: Boolean, default: true }
})

const widgetRef = ref(null)

const pos = ref({
  x: window.innerWidth - 180,
  y: window.innerHeight - 180
})

const dragging = ref(false)
const offset = ref({ x: 0, y: 0 })

function onPointerDown(e) {
  dragging.value = true

  // stop page scroll while dragging
  e.preventDefault()

  const rect = widgetRef.value.getBoundingClientRect()

  offset.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }

  window.addEventListener('pointermove', onPointerMove, { passive: false })
  window.addEventListener('pointerup', onPointerUp)
}

function onPointerMove(e) {
  if (!dragging.value) return

  // prevent scroll interference
  e.preventDefault()

  pos.value = {
    x: e.clientX - offset.value.x,
    y: e.clientY - offset.value.y
  }
}

function onPointerUp() {
  dragging.value = false
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div
    ref="widgetRef"
    class="fixed z-50 flex items-end gap-2 select-none"
    style="touch-action: none;"
    :style="{ left: pos.x + 'px', top: pos.y + 'px' }"
  >
    <!-- TEXT BUBBLE -->
    <div class="bg-white text-black text-xs px-3 py-2 rounded-2xl shadow-lg max-w-[180px]">
      <span v-html="text"></span>
      <br />
      <span class="opacity-70">{{ subText }}</span>
    </div>

    <!-- FLOATING BUTTON -->
    <button
      @pointerdown="onPointerDown"
      @click="action"
      :class="[
        'w-14 h-14 rounded-full border-2  border-[#A855F7] overflow-hidden shadow-lg active:scale-95 transition',
        pulse ? 'animate-pulse' : ''
      ]"
    >
      <img :src="image" class="w-full h-full object-cover" />
    </button>
  </div>
</template>
