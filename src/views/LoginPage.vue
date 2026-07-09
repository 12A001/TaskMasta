<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    await authStore.login({
      email: email.value,
      password: password.value,
    })

    // ONLY runs if login succeeds
    router.push('/dashboard')

  } catch (err) {
    error.value = err?.response?.data?.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0B1020] px-6 pt-16 pb-8">
    <div class="max-w-md mx-auto">
      <!-- Heading -->
      <div class="mb-10">
        <h1 class="text-white text-3xl font-bold mb-2">Welcome Back!</h1>

        <p class="text-[#9CA3AF]">Login to continue your learning journey.</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="text-sm text-gray-300 block mb-2"> Email or Phone </label>

          <input
            v-model="email"
            type="text"
            placeholder="Enter email or phone"
            class="w-full h-14 px-4 rounded-2xl bg-[#141B34] border border-white/10 text-white outline-none focus:border-[#7C3AED]"
          />
        </div>

        <div>
          <label class="text-sm text-gray-300 block mb-2"> Password </label>

          <input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full h-14 px-4 rounded-2xl bg-[#141B34] border border-white/10 text-white outline-none focus:border-[#7C3AED]"
          />
        </div>

        <div class="flex justify-end">
          <button type="button" class="text-[#A855F7] text-sm">Forgot password?</button>
        </div>
        <p v-if="error" class="text-red-400 text-sm">
          {{ error }}
        </p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7]"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <!-- Divider -->
      <div class="my-8 flex items-center gap-4">
        <div class="flex-1 h-px bg-white/10"></div>

        <span class="text-sm text-gray-400"> or continue with </span>

        <div class="flex-1 h-px bg-white/10"></div>
      </div>

      <!-- Social -->
      <!-- <div class="grid grid-cols-2 gap-4">

        <button
          class="h-14 rounded-2xl border border-white/10 bg-[#141B34] text-white font-medium"
        >
          Google
        </button>

        <button
          class="h-14 rounded-2xl border border-white/10 bg-[#141B34] text-white font-medium"
        >
          Apple
        </button>

      </div> -->

      <!-- Footer -->
      <div class="text-center mt-10">
        <span class="text-[#9CA3AF]"> Don't have an account? </span>

        <RouterLink to="/register" class="text-[#A855F7] ml-2 font-medium"> Register </RouterLink>
      </div>
    </div>
  </div>
</template>
