<script setup>
import FormField from './FormField.vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Object,
        default: () => ({})
    },
    error: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    containerClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (key, value) => {
    const updatedValue = { ...props.modelValue };
    updatedValue[key] = value;
    emit('update:modelValue', updatedValue);
};
</script>

<template>
    <FormField
        :label="label"
        id=""
        :error="error"
        :description="description"
        :container-class="containerClass"
    >
        <div class="space-y-2">
            <label
                v-for="option in options"
                :key="option.key"
                class="flex items-center"
            >
                <input
                    :checked="modelValue[option.key]"
                    type="checkbox"
                    class="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    @change="updateValue(option.key, $event.target.checked)"
                />
                <span class="ml-2 text-sm text-gray-700">{{ option.label }}</span>
            </label>
        </div>
    </FormField>
</template>
