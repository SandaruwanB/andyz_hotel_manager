<script setup>
import { ref, computed } from 'vue';
import LoggerActivity from './LoggerActivity.vue';
import LogNote from './LogNote.vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Activity Log'
    },
    activities: {
        type: Array,
        default: () => []
    },
    entityType: {
        type: String,
        required: true
    },
    entityId: {
        type: [String, Number],
        default: null
    },
    canAddNotes: {
        type: Boolean,
        default: true
    },
    currentUser: {
        type: Object,
        default: () => ({
            name: 'Current User',
            avatar: null
        })
    },
    containerClass: {
        type: String,
        default: 'w-full overflow-hidden bg-white rounded-lg shadow-sm lg:w-96'
    },
    maxHeight: {
        type: String,
        default: 'max-h-96 lg:max-h-screen'
    }
});

const emit = defineEmits(['activity-added', 'note-added']);

const activityList = ref([...props.activities]);
const isAddingNote = ref(false);

const addActivity = (type, message, details = '') => {
    const newActivity = {
        id: Date.now(),
        type: type,
        user: props.currentUser.name,
        avatar: props.currentUser.avatar,
        message: message,
        timestamp: new Date().toISOString(),
        details: details,
        entity_type: props.entityType,
        entity_id: props.entityId
    };

    activityList.value.unshift(newActivity);
    emit('activity-added', newActivity);
};

const handleNoteAdded = (noteContent) => {
    addActivity('note', noteContent);
    isAddingNote.value = false;
    emit('note-added', noteContent);
};

const handleNoteCancelled = () => {
    isAddingNote.value = false;
};

const logActivity = (type, message, details = '') => {
    addActivity(type, message, details);
};

defineExpose({
    logActivity,
    addActivity
});
</script>

<template>
    <div :class="containerClass">
        <div class="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between">
                <h3 class="flex items-center text-sm font-medium text-gray-900">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {{ title }}
                </h3>
                <button
                    v-if="canAddNotes"
                    @click="isAddingNote = !isAddingNote"
                    class="px-2 py-1 text-xs text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add Note
                </button>
            </div>
        </div>

        <LogNote
            v-if="isAddingNote"
            :entity-type="entityType"
            @note-added="handleNoteAdded"
            @cancelled="handleNoteCancelled"
        />

        <div :class="['flex-1 overflow-y-auto', maxHeight]">
            <div class="p-4 space-y-4">
                <template v-if="activityList.length > 0">
                    <LoggerActivity
                        v-for="activity in activityList"
                        :key="activity.id"
                        :activity="activity"
                    />
                </template>

                <div v-else class="py-8 text-center">
                    <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No activity yet</h3>
                    <p class="mt-1 text-sm text-gray-500">
                        Activity will appear here as you make changes to this {{ entityType }}.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
