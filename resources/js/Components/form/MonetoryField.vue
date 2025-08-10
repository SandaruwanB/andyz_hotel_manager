<script setup>
import { computed } from 'vue';
import FormField from './FormField.vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    modelValue: {
        type: [String, Number],
        default: ''
    },
    currency: {
        type: String,
        default: '$'
    },
    placeholder: {
        type: String,
        default: '0.00'
    },
    required: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    },
    containerClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const inputClasses = computed(() => {
    const baseClasses = 'block w-full border-gray-300 rounded-md shadow-sm pl-7 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
    const errorClasses = props.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '';
    const disabledClasses = props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : '';

    return `${baseClasses} ${errorClasses} ${disabledClasses}`.trim();
});

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <FormField
        :label="label"
        :id="id"
        :error="error"
        :required="required"
        :description="description"
        :container-class="containerClass"
    >
        <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span class="text-gray-500 sm:text-sm">{{ currency }}</span>
            </div>
            <input
                :id="id"
                type="number"
                step="0.01"
                min="0"
                :value="modelValue"
                :placeholder="placeholder"
                :required="required"
                :disabled="disabled"
                :class="inputClasses"
                @input="updateValue"
            />
        </div>
    </FormField>
</template>
