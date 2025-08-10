<script setup>
import { computed } from 'vue';

const props = defineProps({
    activity: {
        type: Object,
        required: true
    }
});

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        return diffInMinutes === 0 ? 'Just now' : `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
        const hours = Math.floor(diffInHours);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
};

const getActivityIcon = (type) => {
    const icons = {
        'created': 'M12 6v6m0 0v6m0-6h6m-6 0H6',
        'updated': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        'deleted': 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
        'note': 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
        'status_changed': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        'activated': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        'deactivated': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
        'price_updated': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        'payment_received': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        'stock_updated': 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10l.94 10.34A2 2 0 0116 16H8a2 2 0 01-1.94-1.66L7 4z',
        'stock_low': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.134 16.5c-.77.833.192 2.5 1.732 2.5z',
        'customer_contacted': 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
        'booking_created': 'M8 7V3a1 1 0 012 0v4m0 0v4m0 0v6m0-10h4m-4 0H6m4 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        'image_uploaded': 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        'file_uploaded': 'M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        'default': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[type] || icons.default;
};

const getActivityColor = (type) => {
    const colors = {
        'created': 'text-green-600 bg-green-100',
        'updated': 'text-blue-600 bg-blue-100',
        'deleted': 'text-red-600 bg-red-100',
        'note': 'text-gray-600 bg-gray-100',
        'status_changed': 'text-purple-600 bg-purple-100',
        'activated': 'text-green-600 bg-green-100',
        'deactivated': 'text-red-600 bg-red-100',
        'price_updated': 'text-indigo-600 bg-indigo-100',
        'payment_received': 'text-green-600 bg-green-100',
        'stock_updated': 'text-blue-600 bg-blue-100',
        'stock_low': 'text-yellow-600 bg-yellow-100',
        'customer_contacted': 'text-teal-600 bg-teal-100',
        'booking_created': 'text-purple-600 bg-purple-100',
        'image_uploaded': 'text-pink-600 bg-pink-100',
        'file_uploaded': 'text-gray-600 bg-gray-100',
        'default': 'text-gray-600 bg-gray-100'
    };
    return colors[type] || colors.default;
};

const activityIconClass = computed(() => getActivityColor(props.activity.type));
const activityIcon = computed(() => getActivityIcon(props.activity.type));
</script>

<template>
    <div class="flex items-start space-x-3">
        <div :class="['flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center', activityIconClass]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activityIcon" />
            </svg>
        </div>

        <div v-if="activity.avatar" class="flex-shrink-0">
            <img :src="activity.avatar" :alt="activity.user" class="w-6 h-6 rounded-full" />
        </div>

        <div class="flex-1 min-w-0">
            <div class="text-sm">
                <span class="font-medium text-gray-900">{{ activity.user }}</span>
                <span class="ml-1 text-gray-600">{{ activity.message }}</span>
            </div>

            <div v-if="activity.details" class="p-2 mt-1 text-xs text-gray-500 rounded bg-gray-50">
                {{ activity.details }}
            </div>

            <div class="mt-1 text-xs text-gray-400">
                {{ formatTimestamp(activity.timestamp) }}
            </div>
        </div>
    </div>
</template>
