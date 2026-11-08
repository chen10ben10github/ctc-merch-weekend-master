<template>
    <section class="max-w-6xl mx-auto px-6 py-6">
        <p v-if="meta.total" class="mb-4 text-sm font-bold uppercase" aria-live="polite">
            Showing {{ firstItem }}–{{ lastItem }} of {{ meta.total }} products
        </p>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard v-for="(item, index) in products" :key="item.id" :product="item" @add="addToCart" />
        </div>
        <p v-if="loading" class="mt-6 text-center font-extrabold uppercase" role="status">
            Loading products...
        </p>
        <p v-else-if="error" class="mt-6 border-4 border-black bg-white p-6 text-center font-extrabold" role="alert">
            Could not load products: {{ error }}
        </p>
        <p v-else-if="products.length === 0" class="mt-6 bg-white border-4 border-black shadow-brutal p-6 text-center font-extrabold uppercase">
            No products match your search.
        </p>
        <nav v-if="meta.totalPages > 1" class="mt-8 flex flex-wrap items-center justify-center gap-4" aria-label="Product pages">
            <button
                type="button"
                class="bg-white border-4 border-black shadow-brutal px-5 py-2 font-extrabold uppercase hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-brutal"
                :disabled="loading || meta.page === 1"
                @click="goToPage(meta.page - 1)"
            >
                &larr; Previous
            </button>
            <span class="border-4 border-black bg-yellow-300 px-4 py-2 font-extrabold uppercase" aria-live="polite">
                {{ meta.page }}/{{ meta.totalPages }}
            </span>
            <button
                type="button"
                class="bg-white border-4 border-black shadow-brutal px-5 py-2 font-extrabold uppercase hover:bg-yellow-300 active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-x-0 disabled:active:translate-y-0 disabled:active:shadow-brutal"
                :disabled="loading || meta.page === meta.totalPages"
                @click="goToPage(meta.page + 1)"
            >
                Next &rarr;
            </button>
        </nav>
    </section>
</template>
<script>
import ProductCard from '@/component/products/ProductCard.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://brutal-api-sample.onrender.com/api'

export default {
    components: { ProductCard },
    data() {
        return {
            products: [],
            meta: {
                page: 1,
                limit: 20,
                total: 0,
                totalPages: 1
            },
            loading: false,
            error: ''
        }
    },
    computed: {
        firstItem() {
            return this.products.length ? (this.meta.page - 1) * this.meta.limit + 1 : 0
        },
        lastItem() {
            return (this.meta.page - 1) * this.meta.limit + this.products.length
        },
    },
    created() {
        this.fetchProducts()
    },
    emits: ['add'],
    methods: {
        addToCart(product) {
            this.$emit('add', product)
        },
        async goToPage(page) {
            if (this.loading || page < 1 || page > this.meta.totalPages || page === this.meta.page) {
                return
            }

            await this.fetchProducts(page)
        },
        async fetchProducts(page = 1) {
            this.loading = true
            this.error = ''

            try {
                const response = await fetch(
                    `${API_BASE_URL}/products?category=All&page=${page}&limit=${this.meta.limit}`
                )
                if (!response.ok) {
                    throw new Error(`Request failed (${response.status})`)
                }

                const result = await response.json()
                if (!Array.isArray(result.data) || !result.meta) {
                    throw new Error('The product response was invalid.')
                }

                this.products = result.data
                this.meta = result.meta
            } catch (err) {
                console.error('Could not load products.', err)
                this.error = err instanceof Error ? err.message : 'An unexpected error occurred.'
            } finally {
                this.loading = false
            }
        }
    }
}
</script>