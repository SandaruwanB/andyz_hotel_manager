<script setup>
import { ref } from 'vue';
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
        type: String,
        default: null
    },
    accept: {
        type: String,
        default: 'image/*'
    },
    maxSize: {
        type: String,
        default: '10MB'
    },
    error: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: 'PNG, JPG, GIF up to 10MB'
    },
    containerClass: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue', 'file-selected']);

const fileInput = ref(null);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            emit('update:modelValue', e.target.result);
        };
        reader.readAsDataURL(file);
        emit('file-selected', file);
    }
};

const removeImage = () => {
    emit('update:modelValue', null);
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const triggerFileInput = () => {
    fileInput.value?.click();
};
</script>

<template>
    <FormField
        :label="label"
        :id="id"
        :error="error"
        :description="!modelValue ? description : null"
        :container-class="containerClass"
    >
        <div class="p-4 border-2 border-gray-300 border-dashed rounded-lg">
            <div v-if="modelValue" class="relative">
                <img
                    :src="modelValue"
                    alt="Preview"
                    class="object-cover w-full h-48 rounded-lg"
                />
                <button
                    @click="removeImage"
                    type="button"
                    class="absolute flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                >
                    ×
                </button>
            </div>

            <div v-else class="text-center">
                <svg
                    class="w-12 h-12 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <div class="mt-2">
                    <button
                        @click="triggerFileInput"
                        type="button"
                        class="text-indigo-600 cursor-pointer hover:text-indigo-500"
                    >
                        <span class="text-sm font-medium">Upload an image</span>
                    </button>
                    <input
                        ref="fileInput"
                        :id="id"
                        type="file"
                        :accept="accept"
                        @change="handleFileUpload"
                        class="sr-only"
                    />
                </div>
                <p class="mt-1 text-xs text-gray-500">{{ description }}</p>
            </div>
        </div>
    </FormField>
</template>
