<template>
  <div class="min-h-screen bg-paper text-black font-sans">
    <NavHeader :cart-count="cartCount" />
    <main id="products" class="max-w-6xl mx-auto px-6 py-10">
      <h1 class="mb-6 text-4xl font-black uppercase">Shop</h1>
      <ProductSection @add="addToCart" />
      <CartSection :carts="carts" @remove-product="removeProduct" @clear="clearCart" @checkout="checkout" />
    </main>
    <FooterSection />
  </div>
</template>

<script>
import CartSection from '@/component/CartSection.vue'
import FooterSection from '@/component/FooterSection.vue'
import NavHeader from '@/component/NavHeader.vue'
import ProductSection from '@/component/ProductSection.vue'

export default {
  name: 'ShopPage',
  components: {
    CartSection,
    FooterSection,
    NavHeader,
    ProductSection,
  },
  data() {
    return {
      carts: [],
    }
  },
  computed: {
    cartCount() {
      return this.carts.reduce((sum, item) => sum + item.quantity, 0)
    },
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.carts.find((item) => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        this.carts.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        })
      }
    },
    removeProduct(id) {
      this.carts = this.carts.filter((item) => item.id !== id)
    },
    clearCart() {
      this.carts = []
    },
    checkout() {
      if (this.carts.length === 0) {
        return
      }

      const total = this.carts.reduce((sum, item) => sum + item.quantity * item.price, 0)
      window.alert(`Demo checkout complete. No payment was processed. Total: $${total.toFixed(2)}`)
      this.clearCart()
    },
  },
}
</script>