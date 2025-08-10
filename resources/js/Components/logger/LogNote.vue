<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    entityType: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['note-added', 'cancelled']);

const noteContent = ref('');

const computedPlaceholder = computed(() => {
    if (props.placeholder) return props.placeholder;
    return `Add a note about this ${props.entityType}...`;
});

const addNote = () => {
    if (!noteContent.value.trim()) return;

    emit('note-added', noteContent.value.trim());
    noteContent.value = '';
};

const cancel = () => {
    noteContent.value = '';
    emit('cancelled');
};

const handleKeydown = (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        addNote();
    } else if (event.key === 'Escape') {
        event.preventDefault();
        cancel();
    }
};
</script>

<template>
    <div class="p-4 border-b border-gray-200 bg-blue-50">
        <div class="space-y-3">
            <textarea
                v-model="noteContent"
                rows="3"
                :placeholder="computedPlaceholder"
                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                @keydown="handleKeydown"
                autofocus
            />
            <div class="flex items-center justify-between">
                <div class="text-xs text-gray-500">
                    Press Ctrl+Enter to save, Esc to cancel
                </div>
                <div class="flex space-x-2">
                    <button
                        @click="cancel"
                        class="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        @click="addNote"
                        :disabled="!noteContent.trim()"
                        class="px-3 py-1 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
