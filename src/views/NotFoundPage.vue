<template>
  <div class="min-h-screen bg-[#050B2A] text-white flex items-center justify-center px-6">
    <div class="max-w-md text-center">

      <div
        class="w-24 h-24 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6"
      >
        <span class="text-5xl">🚀</span>
      </div>

      <h1 class="text-5xl font-bold mb-2">
        404
      </h1>

      <h2 class="text-2xl font-semibold mb-3">
        Page Not Found
      </h2>

      <p class="text-gray-400 leading-relaxed mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <div class="flex flex-col gap-3">
        <button
          @click="$router.push('/dashboard')"
          class="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-xl font-semibold"
        >
          Back to Dashboard
        </button>

        <button
          @click="$router.push('/')"
          class="w-full border border-white/10 hover:bg-white/5 transition py-3 rounded-xl"
        >
          Home
        </button>
      </div>

    </div>
  </div>
</template>
