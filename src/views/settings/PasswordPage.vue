<template>
  <div class="min-h-screen bg-[#050B2A] text-white">

    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">

        <!-- Back -->
        <button
          @click="goBack"
          class="text-white text-2xl font-bold active:scale-95 transition"
        >
          ←
        </button>

        <h1 class="text-lg font-semibold">
          Change Password
        </h1>

      </div>
    </div>

    <!-- Content -->
    <div class="pt-20 px-5 space-y-4 pb-10">

      <!-- Info -->
      <div class="bg-[#0E1438] p-4 rounded-2xl">
        <h2 class="font-semibold mb-2">Secure Your Account</h2>
        <p class="text-sm text-gray-300">
          Use a strong password that you don’t use elsewhere to keep your account safe.
        </p>
      </div>

      <!-- Form -->
      <div class="bg-[#0E1438] p-4 rounded-2xl space-y-4">

        <!-- Current Password -->
        <div>
          <label class="text-sm text-gray-300">Current Password</label>

          <div class="relative">
            <input
              v-model="currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="Enter current password"
              class="w-full mt-1 p-3 pr-10 rounded-xl bg-[#050B2A] outline-none"
            />

            <button
              type="button"
              @click="showCurrentPassword = !showCurrentPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Eye v-if="!showCurrentPassword" class="w-5 h-5" />
              <EyeOff v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- New Password -->
        <div>
          <label class="text-sm text-gray-300">New Password</label>

          <div class="relative">
            <input
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="Enter new password"
              class="w-full mt-1 p-3 pr-10 rounded-xl bg-[#050B2A] outline-none"
            />

            <button
              type="button"
              @click="showNewPassword = !showNewPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Eye v-if="!showNewPassword" class="w-5 h-5" />
              <EyeOff v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="text-sm text-gray-300">Confirm Password</label>

          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm new password"
              class="w-full mt-1 p-3 pr-10 rounded-xl bg-[#050B2A] outline-none"
            />

            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
              <EyeOff v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      <!-- Error -->
      <p v-if="error" class="text-red-400 text-sm">
        {{ error }}
      </p>

      <!-- Success -->
      <p v-if="success" class="text-green-400 text-sm">
        {{ success }}
      </p>

      <!-- Submit -->
      <button
        @click="updatePassword"
        :disabled="authStore.passwordLoading"
        class="w-full bg-blue-600 py-3 rounded-xl font-semibold active:scale-[0.98] transition disabled:opacity-50"
      >
        {{ authStore.passwordLoading ? 'Updating...' : 'Update Password' }}
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

/** 👁 visibility states */
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const error = ref('')
const success = ref('')

const goBack = () => {
  router.back()
}

const updatePassword = async () => {
  error.value = ''
  success.value = ''

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = 'All fields are required'
    return
  }

  if (newPassword.value.length !== 8) {
    error.value = 'Password must be exactly 8 characters'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    const result = await authStore.changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    })

    success.value = result.message || 'Password updated successfully'

    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''

    setTimeout(() => {
      success.value = ''
    }, 3000)

  } catch (err) {
    error.value =
      err.response?.data?.message ||
      err.message ||
      'Failed to update password'
  }
}
</script>
