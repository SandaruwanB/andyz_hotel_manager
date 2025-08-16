<script setup>
import BaseLayout from '@/Layouts/BaseLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';

const currentDate = ref(new Date());
const selectedDate = ref(new Date());

const navigationModules = [
    {
        name: 'Accounting',
        route: '#',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        color: 'bg-emerald-500 hover:bg-emerald-600',
        glassColor: 'bg-emerald-500/20 backdrop-blur-md border-emerald-200/30',
        description: 'Financial management'
    },
    {
        name: 'Bookings',
        route: 'bookings',
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
        name: 'Employees',
        route: '#',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
        color: 'bg-indigo-500 hover:bg-indigo-600',
        glassColor: 'bg-indigo-500/20 backdrop-blur-md border-indigo-200/30',
        description: 'Guest management'
    },
    {
        name: 'Restaurant',
        route: '#',
        icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
        color: 'bg-orange-500 hover:bg-orange-600',
        glassColor: 'bg-orange-500/20 backdrop-blur-md border-orange-200/30',
        description: 'Point of Sale system'
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

const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
        days.push({
            date: new Date(current),
            isCurrentMonth: current.getMonth() === month,
            isToday: isToday(current),
            isSelected: isSameDay(current, selectedDate.value)
        });
        current.setDate(current.getDate() + 1);
    }

    return days;
});

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const currentMonth = computed(() => {
    return monthNames[currentDate.value.getMonth()];
});

const currentYear = computed(() => {
    return currentDate.value.getFullYear();
});

const isToday = (date) => {
    const today = new Date();
    return isSameDay(date, today);
};

const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
};

const previousMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1);
};

const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1);
};

const selectDate = (date) => {
    selectedDate.value = date;
};

const goToToday = () => {
    const today = new Date();
    currentDate.value = today;
    selectedDate.value = today;
};
</script>

<template>
    <Head title="Dashboard" />

    <BaseLayout>
        <div class="py-6">
            <div class="mx-auto mt-10 max-w-7xl sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    <div class="lg:col-span-1">
                        <div class="overflow-hidden bg-white rounded-lg shadow-sm">
                            <div class="px-3 py-2 border-b border-gray-200 bg-gray-50">
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-medium text-gray-900">
                                        {{ currentMonth.substring(0, 3) }} {{ currentYear }}
                                    </h3>
                                    <div class="flex items-center space-x-1">
                                        <button
                                            @click="previousMonth"
                                            class="p-1 text-gray-400 rounded hover:text-gray-600"
                                        >
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            @click="nextMonth"
                                            class="p-1 text-gray-400 rounded hover:text-gray-600"
                                        >
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="p-3">
                                <div class="grid grid-cols-7 gap-1 mb-1">
                                    <div v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
                                         :key="day"
                                         class="py-1 text-xs font-medium text-center text-gray-500">
                                        {{ day }}
                                    </div>
                                </div>

                                <div class="grid grid-cols-7 gap-1">
                                    <button
                                        v-for="day in calendarDays.slice(0, 35)"
                                        :key="day.date.toISOString()"
                                        @click="selectDate(day.date)"
                                        :class="[
                                            'h-6 w-6 text-xs rounded transition-colors',
                                            day.isCurrentMonth
                                                ? 'text-gray-700 hover:bg-gray-100'
                                                : 'text-gray-300',
                                            day.isToday
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : '',
                                            day.isSelected && !day.isToday
                                                ? 'bg-blue-100 text-blue-600'
                                                : ''
                                        ]"
                                    >
                                        {{ day.date.getDate() }}
                                    </button>
                                </div>

                                <div class="mt-3">
                                    <button
                                        @click="goToToday"
                                        class="w-full px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
                                    >
                                        Today
                                    </button>
                                </div>
                            </div>

                            <div class="p-3 border-t border-gray-200 bg-gray-50">
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs text-gray-600">Check-ins</span>
                                        <span class="text-sm font-semibold text-blue-600">12</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs text-gray-600">Check-outs</span>
                                        <span class="text-sm font-semibold text-orange-600">8</span>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs text-gray-600">Occupancy</span>
                                        <span class="text-sm font-semibold text-green-600">85%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="lg:col-span-3">
                        <div class="p-6 bg-transparent rounded-lg">
                            <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
                                <template v-for="module in navigationModules" :key="module.name">
                                    <Link
                                        v-if="module.route !== '#'"
                                        :href="route(module.route)"
                                        class="relative p-4 overflow-hidden transition-all duration-300 ease-in-out border group bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1"
                                    >
                                        <div :class="[
                                            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl border',
                                            module.glassColor
                                        ]"></div>

                                        <div class="relative z-10 flex flex-col items-center justify-center">
                                            <div :class="[
                                                'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                                                module.color
                                            ]">
                                                <svg class="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="module.icon" />
                                                </svg>
                                            </div>

                                            <div class="transition-all duration-300 group-hover:text-white">
                                                <h3 class="mb-1 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-600">
                                                    {{ module.name }}
                                                </h3>
                                            </div>
                                        </div>

                                        <div class="absolute inset-0 w-8 h-full transition-all duration-700 transform -skew-x-12 opacity-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-pulse group-hover:opacity-100"></div>
                                        <div class="absolute transition-all duration-300 transform translate-x-2 opacity-0 group-hover:opacity-100 top-3 right-3 group-hover:translate-x-0">
                                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </Link>

                                    <button
                                        v-else
                                        @click="() => alert(`${module.name} module coming soon!`)"
                                        class="relative p-4 overflow-hidden text-left transition-all duration-300 ease-in-out border group bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1"
                                    >
                                        <div :class="[
                                            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl border',
                                            module.glassColor
                                        ]"></div>

                                        <div class="relative z-10 flex flex-col items-center justify-center">
                                            <div :class="[
                                                'w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                                                module.color
                                            ]">
                                                <svg class="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="module.icon" />
                                                </svg>
                                            </div>
                                            <div class="transition-all duration-300">
                                                <h3 class="mb-1 text-sm font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-600">
                                                    {{ module.name }}
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="absolute inset-0 w-8 h-full transition-all duration-700 transform -skew-x-12 opacity-0 -top-4 -left-4 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-pulse group-hover:opacity-100"></div>
                                    </button>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>
