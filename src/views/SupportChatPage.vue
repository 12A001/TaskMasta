<script setup>
import { ref } from 'vue'

const input = ref('')

//  CHANGE THIS TO YOUR SUPPORT NUMBER
// format: country code + number (NO + sign)
const SUPPORT_PHONE = '+447468651521'

function sendMessage() {
  if (!input.value.trim()) return

  const message = input.value.trim()

  // WhatsApp deep link
  const url = `https://wa.me/${SUPPORT_PHONE}?text=${encodeURIComponent(message)}`

  window.open(url, '_blank')

  input.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-[#0B1020] flex flex-col text-white">

    <!-- HEADER -->
    <div class="p-4 border-b border-white/10">
      <h1 class="text-lg font-bold">Support Chat</h1>
      <p class="text-xs text-gray-400">
        You’ll be redirected to WhatsApp for support
      </p>
    </div>

    <!-- INFO BOX -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="text-center bg-[#141B34] p-6 rounded-2xl max-w-sm">
        <p class="text-sm text-gray-300">
          Send your message and continue support on WhatsApp instantly.
        </p>
      </div>
    </div>

    <!-- INPUT -->
    <div class="p-3 border-t border-white/10 flex gap-2">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        class="flex-1 bg-[#141B34] text-white px-4 py-3 rounded-xl outline-none text-sm"
      />

      <button
        @click="sendMessage"
        class="bg-[#25D366] px-4 rounded-xl text-sm font-semibold text-black"
      >
        WhatsApp
      </button>
    </div>

  </div>
</template>
