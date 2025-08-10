<script setup>
import FormField from './FormField.vue';
import { computed } from 'vue';

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
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
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
    step: {
        type: [String, Number],
        default: null
    },
    min: {
        type: [String, Number],
        default: null
    },
    max: {
        type: [String, Number],
        default: null
    },
    containerClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const inputClasses = computed(() => {
    const baseClasses = 'block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';
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
        <input
            :id="id"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :step="step"
            :min="min"
            :max="max"
            :class="inputClasses"
            @input="updateValue"
        />
    </FormField>
</template>
