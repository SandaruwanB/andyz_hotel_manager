<script setup>
import { Link } from '@inertiajs/vue3';

const navigationModules = [
    {
        name: 'Bookings',
        route: '#',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        color: 'bg-blue-500 hover:bg-blue-600',
        glassColor: 'bg-blue-500/20 backdrop-blur-md border-blue-200/30',
        description: 'Manage room bookings'
    },
    {
        name: 'Inventory',
        route: 'products',
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
        color: 'bg-green-500 hover:bg-green-600',
        glassColor: 'bg-green-500/20 backdrop-blur-md border-green-200/30',
        description: 'Product management'
    },
    {
        name: 'Rooms',
        route: '#',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        color: 'bg-purple-500 hover:bg-purple-600',
        glassColor: 'bg-purple-500/20 backdrop-blur-md border-purple-200/30',
        description: 'Room management'
    },
    {
        name: 'Guests',
        route: '#',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
        color: 'bg-indigo-500 hover:bg-indigo-600',
        glassColor: 'bg-indigo-500/20 backdrop-blur-md border-indigo-200/30',
        description: 'Guest management'
    },
    {
        name: 'Reports',
        route: '#',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        color: 'bg-orange-500 hover:bg-orange-600',
        glassColor: 'bg-orange-500/20 backdrop-blur-md border-orange-200/30',
        description: 'Analytics & reports'
    },
    {
        name: 'Settings',
        route: '#',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        color: 'bg-gray-500 hover:bg-gray-600',
        glassColor: 'bg-gray-500/20 backdrop-blur-md border-gray-200/30',
        description: 'System settings'
    }
];

</script>

<template v-for="module in navigationModules" :key="module.name">
    <Link v-if="module.route !== '#'" :href="route(module.route)"
        class="relative p-4 overflow-hidden transition-all duration-300 ease-in-out border group bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1">
    <!-- Glassy overlay on hover -->
    <div :class="[
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl border',
        module.glassColor
    ]"></div>

    <!-- Content -->
    <div class="relative z-10">
        <!-- Icon -->
        <div :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
            module.color
        ]">
            <svg class="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="module.icon" />
            </svg>
        </div>

        <!-- Module Info -->
        <div class="transition-all duration-300 group-hover:text-white">
            <h3 class="mb-1 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white">
                {{ module.name }}
            </h3>
        </div>
    </div>

    <!-- Shimmer effect -->
    <div
        class="absolute inset-0 w-8 h-full transition-all duration-700 transform -skew-x-12 opacity-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-pulse group-hover:opacity-100">
    </div>

    <!-- Hover Arrow -->
    <div
        class="absolute transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 top-3 right-3 group-hover:translate-x-0">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
    </div>
    </Link>

    <!-- Button for placeholder routes with glassy effect -->
    <button v-else @click="() => alert(`${module.name} module coming soon!`)"
        class="relative p-4 overflow-hidden text-left transition-all duration-300 ease-in-out border group bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1">
        <!-- Glassy overlay on hover -->
        <div :class="[
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl border',
            module.glassColor
        ]"></div>

        <!-- Content -->
        <div class="relative z-10">
            <!-- Icon -->
            <div :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                module.color
            ]">
                <svg class="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="module.icon" />
                </svg>
            </div>

            <!-- Module Info -->
            <div class="transition-all duration-300">
                <h3
                    class="mb-1 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-white">
                    {{ module.name }}
                </h3>
            </div>
        </div>

        <!-- Shimmer effect -->
        <div
            class="absolute inset-0 w-8 h-full transition-all duration-700 transform -skew-x-12 opacity-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-pulse group-hover:opacity-100">
        </div>
    </button>
</template>
