<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const slides = [
  {
    title: 'Learn & Earn',
    description:
      'Watch educational content, gain useful knowledge, and earn rewards for completing learning tasks.',
    buttonText: 'Get Started'
  },
  {
    title: 'Watch Videos',
    description:
      'Complete full video lessons, answer simple questions based on what you watched, and earn tokens for successful completion.',
    buttonText: 'Next'
  },
  {
    title: 'Unlock Rewards',
    description:
      'Select the correct reward box, activate your earnings with a reward code, collect tokens, and withdraw your rewards securely.',
    buttonText: 'Continue'
  }
]

const currentSlide = ref(0)

const activeSlide = computed(() => slides[currentSlide.value])

const nextPage = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#050A18]"
  >
    <div
      class="w-full max-w-md min-h-[95vh] border border-white/10  bg-[#070D22] overflow-hidden flex flex-col px-6 pt-8 pb-8 shadow-2xl"
    >
      <!-- Status Bar Space -->
      <div class="h-4"></div>

      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
          >
            <span class="text-xl">⭐</span>
          </div>

          <h1 class="text-white text-3xl font-bold">
            TaskMasta
          </h1>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 flex flex-col">
        <!-- Text -->
        <div class="text-center">
          <h2
            class="text-white text-[38px] font-bold leading-tight"
          >
            {{ activeSlide.title }}
          </h2>

          <p
            class="text-[#9CA3AF] mt-4 text-base leading-7 max-w-xs mx-auto"
          >
            {{ activeSlide.description }}
          </p>
        </div>

        <!-- Illustration -->
        <div class="flex-1 flex items-center justify-center py-8">
          <img
            src="/onboarding-hero.png"
            alt="TaskNova"
            class="w-full max-w-sm object-contain transition-all duration-500"
          />
        </div>

        <!-- CTA -->
        <button
          @click="nextPage"
          class="w-full h-14 rounded-2xl bg-[#F9C63D] text-black font-bold text-lg shadow-lg active:scale-[0.98] transition"
        >
          {{ activeSlide.buttonText }}
        </button>

        <!-- Dots -->
        <div class="flex justify-center gap-3 mt-8">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            @click="currentSlide = index"
            class="transition-all duration-300"
            :class="
              currentSlide === index
                ? 'w-8 h-2 bg-white rounded-full'
                : 'w-2 h-2 bg-white/30 rounded-full'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
