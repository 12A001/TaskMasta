<template>
  <div class="min-h-screen bg-[#050B2A] text-white">
    <!-- Header -->
    <div class="fixed top-0 left-0 w-full bg-[#050B2A] z-50 border-b border-[#0E1438]">
      <div class="flex items-center gap-3 px-4 py-4">
        <!-- Back -->
        <button @click="goBack" class="text-white text-2xl font-bold active:scale-95 transition">
          ←
        </button>

        <h1 class="text-lg font-semibold">Help & Support</h1>
      </div>
    </div>

    <!-- Content -->
    <div class="pt-20 px-5 space-y-4 pb-10">
      <!-- Contact Support -->
      <div class="bg-[#0E1438] p-4 rounded-2xl space-y-2">
        <h2 class="font-semibold text-white">Contact Support</h2>
        <p class="text-sm text-gray-300">
          Need help? Reach out to our support team and we’ll respond as soon as possible.
        </p>

        <button
          @click="contactSupport"
          class="mt-3 w-full bg-blue-600 py-3 rounded-xl font-semibold active:scale-[0.98] transition"
        >
          Send a Message
        </button>
      </div>

      <!-- FAQ -->
      <div class="bg-[#0E1438] p-4 rounded-2xl">
        <h2 class="font-semibold mb-3">FAQs</h2>

        <div class="space-y-3 text-sm text-gray-300">
          <div>
            <p class="font-medium text-white">How do I reset my password?</p>
            <p>Go to Settings → Password to change your login credentials.</p>
          </div>

          <div>
            <p class="font-medium text-white">Seamless account access</p>
            <p>
              We ensure you always stay connected. If you need assistance, our support team is
              available to help anytime.
            </p>
          </div>

          <div>
            <p class="font-medium text-white">How long does support take?</p>
            <p>Usually between 1–24 hours depending on request volume.</p>
          </div>
        </div>
      </div>

      <!-- App Info -->
      <div class="text-center text-xs text-gray-500 pt-4">Version 1.0.0 • TaskMasta Platform</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const contactSupport = () => {
  router.push('/support')
}
</script>
