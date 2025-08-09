<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    align: {
        type: String,
        default: 'left'
    },
    width: {
        type: String,
        default: '48'
    },
    contentClasses: {
        type: String,
        default: 'py-1 bg-white'
    }
});

const open = ref(false);
const trigger = ref(null);
const content = ref(null);

const closeOnEscape = (e) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};

const closeOnClickOutside = (e) => {
    if (!trigger.value?.contains(e.target) && !content.value?.contains(e.target)) {
        open.value = false;
    }
};

onMounted(() => {
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('click', closeOnClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEscape);
    document.removeEventListener('click', closeOnClickOutside);
});

const widthClass = {
    '48': 'w-48',
    '56': 'w-56',
    '64': 'w-64',
    '72': 'w-72'
}[props.width];

const alignmentClasses = {
    left: 'origin-top-left left-0',
    right: 'origin-top-right right-0'
}[props.align];
</script>

<template>
    <div class="relative">
        <div ref="trigger" @click="open = !open">
            <slot name="trigger" />
        </div>

        <div
            v-show="open"
            ref="content"
            :class="[
                'absolute z-50 mt-2 rounded-md shadow-lg',
                widthClass,
                alignmentClasses
            ]"
            style="display: none;"
            :style="{ display: open ? 'block' : 'none' }"
        >
            <div
                :class="[
                    'rounded-md ring-1 ring-black ring-opacity-5',
                    contentClasses
                ]"
            >
                <slot name="content" />
            </div>
        </div>
    </div>
</template>
