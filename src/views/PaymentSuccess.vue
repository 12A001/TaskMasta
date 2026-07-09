<template>
  <div class="min-h-screen flex items-center justify-center bg-[#050B2A] text-white">

    <div class="text-center space-y-4">
      <div class="text-green-400 text-2xl font-bold">
        Payment Successful
      </div>

      <p class="text-gray-300">
        Verifying your upgrade...
      </p>

      <p v-if="message" class="text-sm text-green-400">
        {{ message }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {  useRouter } from 'vue-router'
// import paymentService from '@/services/paymentService'
import { useAuthStore } from '@/stores/auth'

// const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const message = ref('')

onMounted(async () => {
  await auth.fetchProfile()

  message.value = 'Payment received and account updated.'

  setTimeout(() => {
    router.push('/dashboard')
  }, 1500)
})
</script>
