<script setup>
import { provide, ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'pills', 'underline'].includes(value)
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    }
});

const emit = defineEmits(['update:modelValue']);

const activeTab = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    activeTab.value = newValue;
});

const setActiveTab = (tabId) => {
    activeTab.value = tabId;
    emit('update:modelValue', tabId);
};

provide('tabContext', {
    activeTab,
    setActiveTab,
    variant: props.variant,
    size: props.size
});

const containerClasses = {
    default: 'border-b border-gray-200',
    pills: '',
    underline: 'border-b border-gray-200'
};

const navClasses = {
    default: 'flex space-x-8',
    pills: 'flex space-x-2',
    underline: 'flex space-x-8'
};

const sizeClasses = {
    sm: 'px-4',
    md: 'px-6',
    lg: 'px-8'
};
</script>

<template>
    <div>
        <div :class="containerClasses[variant]">
            <nav
                :class="[navClasses[variant], sizeClasses[size]]"
                aria-label="Tabs"
            >
                <slot name="tabs" />
            </nav>
        </div>

        <div class="tab-content">
            <slot name="content" />
        </div>
    </div>
</template>
