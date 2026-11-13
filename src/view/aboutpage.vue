<template>
  <div class="min-h-screen bg-paper text-black font-sans">
    <NavHeader :cart-count="0" />
    <main id="about" class="max-w-4xl mx-auto px-6 py-16">
      <h1 class="mb-6 text-4xl font-black uppercase">About Brutal Merch</h1>
      <p class="text-lg font-medium">
        We make playful gear for people who love building things with code.
      </p>
    </main>
    <FooterSection />
  </div>
</template>

<script>
import FooterSection from '@/component/FooterSection.vue'
import NavHeader from '@/component/NavHeader.vue'
// import FAQSection from '@/component/FAQSection.vue'
// import NewsSletter from '@/component/NewsSletter.vue'

export default {
  name: 'AboutPage',
  components: {
    FooterSection,
    NavHeader,
    // FAQSection,
    // NewsSletter

  },
}
</script>