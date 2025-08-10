<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    error: {
        type: String,
        default: null
    },
    required: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        default: null
    },
    labelClass: {
        type: String,
        default: 'block text-sm font-medium text-gray-700'
    },
    containerClass: {
        type: String,
        default: ''
    }
});

const slots = useSlots();

const labelText = computed(() => {
    return props.required ? `${props.label} *` : props.label;
});
</script>

<template>
    <div :class="containerClass">
        <label :for="id" :class="labelClass">
            {{ labelText }}
        </label>

        <div class="mt-1">
            <slot />
        </div>

        <p v-if="description && !error" class="mt-1 text-sm text-gray-500">
            {{ description }}
        </p>

        <p v-if="error" class="mt-1 text-sm text-red-600">
            {{ error }}
        </p>
    </div>
</template>
