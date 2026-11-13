<template>
    <section id="products" class="max-w-6xl mx-auto px-6 pt-14">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-4 h-4 bg-brand border-2 border-black"></div>
            <h2 class="text-2xl font-black uppercase">Shop</h2>
        </div>

        <div class="bg-white border-4 border-black shadow-brutal p-4 flex flex-wrap items-center gap-4">
            <input type="text" placeholder="Search products..."
                class="flex-1 min-w-48 border-2 border-black bg-paper px-3 py-2 font-bold focus:outline-none focus:bg-white"
                @input="$emit('search-change', $event.target.value)">

            <div class="flex flex-wrap gap-2">
                <button v-for="category in categories" :key="category" type="button"
                    :class="[
                        'border-2 border-black px-3 py-2 text-sm font-extrabold uppercase cursor-pointer',
                        selectedCategory === category ? 'bg-black text-white' : 'bg-white hover:bg-paper'
                    ]"
                    :aria-pressed="selectedCategory === category"
                    @click="selectCategory(category)">{{ category }}</button>
            </div>
        </div>

    </section>
</template>

<script>
export default {
    emits: ['category-change', 'search-change'],
    data() {
        return {
            categories: ['All', 'Stickers', 'Apparel', 'Desk'],
            selectedCategory: 'All'
        }
    },
    methods: {
        selectCategory(category) {
            this.selectedCategory = category
            this.$emit('category-change', category)
        }
    }
}
</script>