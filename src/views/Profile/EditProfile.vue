<template>
  <div class="min-h-screen bg-[#050B2A] text-white">

    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">

        <button
          @click="goBack"
          class="text-white text-2xl font-bold active:scale-95 transition"
        >
          ←
        </button>

        <h1 class="text-lg font-semibold">
          Edit Profile
        </h1>

      </div>
    </div>

    <!-- Content -->
    <div class="pt-20 px-5 space-y-4 pb-10">

      <!-- Avatar -->
      <div class="flex flex-col items-center">
        <div class="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
          {{ form.name?.charAt(0)?.toUpperCase() }}
        </div>
      </div>

      <!-- Form -->
      <div class="bg-[#0E1438] p-4 rounded-2xl space-y-4">

        <div>
          <label class="text-sm text-gray-300">Full Name</label>
          <input
            v-model="form.name"
            class="w-full mt-1 p-3 rounded-xl bg-[#050B2A] outline-none"
            type="text"
          />
        </div>

        <div>
          <label class="text-sm text-gray-300">Email</label>
          <input
            v-model="form.email"
            class="w-full mt-1 p-3 rounded-xl bg-[#050B2A] outline-none opacity-60"
            type="email"
            disabled
          />
        </div>

      </div>

      <!-- Status -->
      <p v-if="error" class="text-red-400 text-sm">
        {{ error }}
      </p>

      <p v-if="success" class="text-green-400 text-sm">
        {{ success }}
      </p>

      <!-- Save -->
      <button
        @click="updateProfile"
        class="w-full bg-blue-600 py-3 rounded-xl font-semibold active:scale-[0.98] transition"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : 'Save Changes' }}
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  name: '',
  email: ''
})

const goBack = () => {
  router.back()
}

const fetchProfile = async () => {
  await authStore.fetchProfile()

  form.value.name = authStore.user?.name
  form.value.email = authStore.user?.email
}

const updateProfile = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  const res = await authStore.updateProfile({
    name: form.value.name
  })

  loading.value = false

  if (!res.success) {
    error.value = res.message
    return
  }

  success.value = 'Profile updated successfully'

  // AUTO CLEAR SUCCESS MESSAGE AFTER 3 SECONDS
  setTimeout(() => {
    success.value = ''
  }, 3000)
}

onMounted(() => {
  fetchProfile()
})

</script>
