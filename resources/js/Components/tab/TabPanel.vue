<script setup>
import { inject, computed, ref, watch } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    },
    lazy: {
        type: Boolean,
        default: false
    }
});

const tabContext = inject('tabContext');

const isActive = computed(() => tabContext.activeTab.value === props.id);
const hasBeenActive = ref(false);

watch(isActive, (newValue) => {
    if (newValue) {
        hasBeenActive.value = true;
    }
});

const shouldRender = computed(() => {
    if (!props.lazy) return true;
    return hasBeenActive.value;
});
</script>

<template>
    <div
        v-if="shouldRender"
        v-show="isActive"
        :id="`panel-${id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${id}`"
    >
        <slot />
    </div>
</template>
