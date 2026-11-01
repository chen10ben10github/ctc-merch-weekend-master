<template>
    <section id="cart" class="max-w-3xl mx-auto px-6 py-14">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-4 h-4 bg-brand border-2 border-black"></div>
            <h2 class="text-2xl font-black uppercase">Your cart ({{ cartCount }} items)</h2>
        </div>

        <div class="bg-white border-4 border-black shadow-brutal p-5">
            <ul class="space-y-3">
                <!-- 6a. CART ROWS (3 copies) -->
                <CartCard v-for="item in cart" :key="item.id" :product="item" @remove="$emit('remove', $event)" />
            </ul>

            <!-- 6b. EMPTY CART (hidden now — show it when the cart has no rows) -->
            <p v-if="cart.length === 0" class="border-2 border-black bg-paper p-4 text-center font-extrabold uppercase">
                Your cart is empty.
            </p>

            <div v-if="cart.length > 0" class="mt-5 pt-5 border-t-4 border-black flex flex-wrap items-center justify-between gap-4">
                <p class="text-2xl font-black uppercase">Total: ${{ total.toFixed(2) }}</p>
                <div class="flex gap-3">
                    <button
                        @click="$emit('clear')"
                        class="border-2 border-black bg-white px-4 py-2 text-sm font-extrabold uppercase cursor-pointer">Clear</button>
                    <button
                        class="border-2 border-black bg-brand text-white shadow-brutal-sm px-4 py-2 text-sm font-extrabold uppercase cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none">Checkout</button>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import CartCard from '@/component/carts/CartCard.vue';
export default {
    components: { CartCard },
    props: {
        cart: {
            type: Array,
            required: true
        }
    },
    emits: ['remove', 'clear'],
    computed: {
        cartCount() {
            return this.cart.reduce((count, item) => count + item.quantity, 0)
        },
        total() {
            return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        }
    }
}
</script>