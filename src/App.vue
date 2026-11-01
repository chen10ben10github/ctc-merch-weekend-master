<template>
  <div class="min-h-screen bg-paper text-black font-sans">
    <AnnouncementBar />
    <NavHeader :cart-count="cartCount" />
    <main id="top">
      <HeroSection />
      <FilterBar />
      <ProductSection @add="addToCart" />
      <CartSection :cart="cart" @remove="removeFromCart" @clear="clearCart" />
      <PerkSection />
      <FAQSection />
      <NewsSletter />
    </main>
    <FooterSection />
  </div>
</template>
<script>
import NavHeader from '@/component/NavHeader.vue';
import HeroSection from '@/component/HeroSection.vue';
import FilterBar from '@/component/FilterBar.vue';
import ProductSection from '@/component/ProductSection.vue';
import CartSection from '@/component/CartSection.vue';
import PerkSection from '@/component/PerkSection.vue';
import FAQSection from '@/component/FAQSection.vue';
import NewsSletter from '@/component/NewsSletter.vue';
import FooterSection from '@/component/FooterSection.vue';
import AnnouncementBar from '@/component/AnnouncementBar.vue';
export default {
  components: {
    NavHeader,
    HeroSection,
    FilterBar,
    ProductSection,
    CartSection,
    PerkSection,
    FAQSection,
    NewsSletter,
    FooterSection,
    AnnouncementBar
  },
  data() {
    return {
      cart: [
        { id: 1, name: 'Semicolon Sticker Pack', price: 4, quantity: 2 },
        { id: 3, name: 'Git Push Mug', price: 12, quantity: 1 },
        { id: 4, name: 'Dark Mode Tee', price: 22, quantity: 1 }
      ]
    }
  },
  computed: {
    cartCount() {
      return this.cart.reduce((count, item) => count + item.quantity, 0)
    }
  },
  methods: {
    addToCart(product) {
      const cartItem = this.cart.find(item => item.id === product.id)

      if (cartItem) {
        cartItem.quantity += 1
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
    },
    clearCart() {
      this.cart = []
    }
  }
}
</script>