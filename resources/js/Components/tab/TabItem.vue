<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    badge: {
        type: [String, Number],
        default: null
    }
});

const tabContext = inject('tabContext');

const isActive = computed(() => tabContext.activeTab.value === props.id);

const handleClick = () => {
    if (!props.disabled) {
        tabContext.setActiveTab(props.id);
    }
};

const getTabClasses = () => {
    const { variant, size } = tabContext;

    const baseClasses = [
        'inline-flex items-center font-medium transition-colors duration-200 focus:outline-none'
    ];

    const sizeClasses = {
        sm: 'px-2 py-2 text-xs',
        md: 'px-1 py-4 text-sm',
        lg: 'px-2 py-5 text-base'
    };

    const variantClasses = {
        default: [
            'border-b-2',
            isActive.value
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ],
        pills: [
            'rounded-md px-3 py-2',
            isActive.value
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        ],
        underline: [
            'border-b-2 pb-2',
            isActive.value
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        ]
    };

    const disabledClasses = props.disabled
        ? ['opacity-50 cursor-not-allowed']
        : ['cursor-pointer'];

    return [
        ...baseClasses,
        sizeClasses[size],
        ...variantClasses[variant],
        ...disabledClasses
    ];
};
</script>

<template>
    <button
        @click="handleClick"
        :disabled="disabled"
        :class="getTabClasses()"
        :aria-selected="isActive"
        role="tab"
    >
        <svg
            v-if="icon"
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icon" />
        </svg>

        <span>{{ label }}</span>

        <span
            v-if="badge"
            class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            :class="isActive ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-200 text-gray-800'"
        >
            {{ badge }}
        </span>
    </button>
</template>
