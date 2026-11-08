<script>
export default {
  name: 'NotFoundView',
}
</script>

<template>
  <main class="min-h-screen bg-paper px-6 py-20 text-center text-black">
    <h1 class="mb-4 text-7xl font-black">404</h1>
    <p class="mb-8 text-xl font-bold">Sorry, we couldn't find that page.</p>
    <RouterLink
      to="/"
      class="inline-block border-4 border-black bg-yellow-300 px-5 py-3 font-extrabold uppercase shadow-brutal"
    >
      Back to Home
    </RouterLink>
  </main>
</template>