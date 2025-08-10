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
    options: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Select an option'
    },
    valueKey: {
        type: String,
        default: 'value'
    },
    labelKey: {
        type: String,
        default: 'label'
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

const selectClasses = computed(() => {
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
        <select
            :id="id"
            :value="modelValue"
            :required="required"
            :disabled="disabled"
            :class="selectClasses"
            @change="updateValue"
        >
            <option value="">{{ placeholder }}</option>
            <option
                v-for="option in options"
                :key="option[valueKey]"
                :value="option[valueKey]"
            >
                {{ option[labelKey] }}
            </option>
        </select>
    </FormField>
</template>
