<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  referral: route.query.ref || '',
})

const handleRegister = async () => {
  error.value = ''

  const password = form.value.password

  if (!form.value.fullName || !form.value.email || !password) {
    error.value = 'Please fill all fields'
    return
  }

  //  EXACT 8 CHARACTER RULE (FRONTEND VALIDATION)
  if (password.length !== 8) {
    error.value = 'Password must be exactly 8 characters'
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    loading.value = true

    await authStore.register({
      name: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      referral: form.value.referral,
    })

    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#050B2A] px-6 pt-10 pb-8">
    <div class="max-w-md mx-auto">
      <!-- Heading -->
      <div class="mb-8">
        <h1 class="text-white text-3xl font-bold mb-2">Create Account</h1>

        <p class="text-[#9CA3AF]">Join thousands of learners earning and growing.</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="form.fullName"
          type="text"
          placeholder="Enter your full name"
          class="w-full h-14 px-4 rounded-2xl bg-[#141B34] border border-white/10 text-white"
        />

        <input
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          class="w-full h-14 px-4 rounded-2xl bg-[#141B34] border border-white/10 text-white"
        />

        <input
          v-model="form.password"
          type="password"
          placeholder="Create a password"
          class="w-full h-14 px-4 rounded-2xl bg-[#141B34] border border-white/10 text-white"
        />

        <p class="text-xs text-[#9CA3AF] mt-1">Password must be exactly 8 characters</p>

        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm your password"
          class="w-full h-14 px-4 rounded-2xl bg-[#141B34] border border-white/10 text-white"
        />

        <!-- Terms -->
        <label class="flex items-center gap-3 mt-2">
          <input type="checkbox" class="accent-[#7C3AED]" />

          <span class="text-sm text-[#9CA3AF]">
            I agree to the
            <span class="text-[#A855F7]"> Terms & Conditions </span>
          </span>
        </label>
        <p v-if="error" class="text-red-400 text-sm">
          {{ error }}
        </p>
        <button
          type="submit"
          :disabled="loading"
          class="w-full h-14 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7]"
        >
          {{ loading ? 'Creating Account...' : 'Register' }}
        </button>
      </form>

      <!-- Footer -->
      <div class="text-center mt-8">
        <span class="text-[#9CA3AF]"> Already have an account? </span>

        <RouterLink to="/login" class="text-[#A855F7] ml-2 font-medium"> Login </RouterLink>
      </div>
    </div>
  </div>
</template>
