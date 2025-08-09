<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import MainLayout from '@/Layouts/MainLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { getInventoryNavItems } from '@/@types/NavItems';

const viewMode = ref('card');
const searchQuery = ref('');

const inventoryItems = getInventoryNavItems();

const products = ref([
    {
        id: 1,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 99.99,
        stock: 25,
        image: 'https://via.placeholder.com/200x200?text=Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        status: 'active'
    },
    {
        id: 2,
        name: 'Smart Watch',
        category: 'Electronics',
        price: 299.99,
        stock: 15,
        image: 'https://via.placeholder.com/200x200?text=Smart+Watch',
        description: 'Feature-rich smartwatch with health monitoring',
        status: 'active'
    },
    {
        id: 3,
        name: 'Coffee Maker',
        category: 'Appliances',
        price: 149.99,
        stock: 8,
        image: 'https://via.placeholder.com/200x200?text=Coffee+Maker',
        description: 'Automatic drip coffee maker with programmable timer',
        status: 'active'
    },
    {
        id: 4,
        name: 'Laptop Stand',
        category: 'Accessories',
        price: 49.99,
        stock: 0,
        image: 'https://via.placeholder.com/200x200?text=Laptop+Stand',
        description: 'Adjustable aluminum laptop stand for better ergonomics',
        status: 'out_of_stock'
    },
    {
        id: 5,
        name: 'Bluetooth Speaker',
        category: 'Electronics',
        price: 79.99,
        stock: 32,
        image: 'https://via.placeholder.com/200x200?text=Speaker',
        description: 'Portable bluetooth speaker with excellent sound quality',
        status: 'active'
    },
    {
        id: 6,
        name: 'Desk Lamp',
        category: 'Furniture',
        price: 39.99,
        stock: 12,
        image: 'https://via.placeholder.com/200x200?text=Desk+Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature',
        status: 'active'
    }
]);


const filteredProducts = computed(() => {
    if (!searchQuery.value) {
        return products.value;
    }

    const query = searchQuery.value.toLowerCase();
    return products.value.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
});

const getStatusBadge = (status, stock) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (stock < 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
};

const getStatusText = (status, stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
};

const clearSearch = () => {
    searchQuery.value = '';
};
</script>

<template>
    <Head title="Products" />

    <MainLayout :nav-items="inventoryItems">
        <div class="py-8">
            <div class="sm:px-6 lg:px-8">
                <div class="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                    <div class="relative max-w-md">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search products by name, category, or description..."
                            class="block w-full py-2 pl-10 pr-10 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <div
                            v-if="searchQuery"
                            class="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            <button
                                @click="clearSearch"
                                class="text-gray-400 hover:text-gray-600"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div v-if="searchQuery" class="mt-2 text-sm text-gray-600">
                        {{ filteredProducts.length }} of {{ products.length }} products found
                        <span v-if="searchQuery" class="font-medium">for "{{ searchQuery }}"</span>
                    </div>

                    <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <Link :href="route('products.create')" class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Product
                        </Link>

                        <div class="flex items-center space-x-2">
                            <span class="text-sm text-gray-600"></span>
                            <div class="inline-flex p-1 bg-white border border-gray-200 rounded-lg">
                                <button
                                    @click="viewMode = 'card'"
                                    :class="[
                                        'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                                        viewMode === 'card'
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-500 hover:text-gray-700'
                                    ]"
                                >
                                    <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                    Cards
                                </button>
                                <button
                                    @click="viewMode = 'table'"
                                    :class="[
                                        'px-3 py-1 text-sm font-medium rounded-md transition-colors',
                                        viewMode === 'table'
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-500 hover:text-gray-700'
                                    ]"
                                >
                                    <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                    Table
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="viewMode === 'card'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
                    <div
                        v-for="product in filteredProducts"
                        :key="product.id"
                        class="relative p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-sm group hover:shadow-md"
                    >
                        <div class="mb-4 overflow-hidden bg-gray-100 rounded-lg aspect-square">
                            <img
                                :src="product.image"
                                :alt="product.name"
                                class="object-cover object-center w-full h-full transition-transform duration-200 group-hover:scale-105"
                            />
                        </div>

                        <div class="space-y-2">
                            <div class="flex items-start justify-between">
                                <h3 class="text-sm font-medium text-gray-900 line-clamp-2">
                                    {{ product.name }}
                                </h3>
                                <span
                                    :class="[
                                        'px-2 py-1 text-xs font-medium rounded-full',
                                        getStatusBadge(product.status, product.stock)
                                    ]"
                                >
                                    {{ getStatusText(product.status, product.stock) }}
                                </span>
                            </div>

                            <p class="text-sm text-gray-600">{{ product.category }}</p>
                            <p class="text-sm text-gray-500 line-clamp-2">{{ product.description }}</p>

                            <div class="flex items-center justify-between">
                                <span class="text-lg font-semibold text-gray-900">
                                    ${{ product.price }}
                                </span>
                                <span class="text-sm text-gray-600">
                                    Stock: {{ product.stock }}
                                </span>
                            </div>
                        </div>

                        <div class="flex mt-4 space-x-2">
                            <button class="flex-1 px-3 py-2 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-700">
                                Edit
                            </button>
                            <button class="px-3 py-2 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-50">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div v-if="viewMode === 'table'" class="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Product
                                </th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Category
                                </th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Price
                                </th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Stock
                                </th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Status
                                </th>
                                <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                                v-for="product in filteredProducts"
                                :key="product.id"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 w-12 h-12">
                                            <img
                                                :src="product.image"
                                                :alt="product.name"
                                                class="object-cover w-12 h-12 rounded-lg"
                                            />
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ product.name }}
                                            </div>
                                            <div class="max-w-xs text-sm text-gray-500 truncate">
                                                {{ product.description }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                    {{ product.category }}
                                </td>
                                <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                    ${{ product.price }}
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                    {{ product.stock }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        :class="[
                                            'inline-flex px-2 text-xs font-semibold rounded-full',
                                            getStatusBadge(product.status, product.stock)
                                        ]"
                                    >
                                        {{ getStatusText(product.status, product.stock) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 space-x-2 text-sm font-medium whitespace-nowrap">
                                    <button class="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </button>
                                    <button class="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="products.length === 0" class="py-12 text-center">
                    <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No products</h3>
                    <p class="mt-1 text-sm text-gray-500">Get started by adding your first product.</p>
                    <div class="mt-6">
                        <button class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
