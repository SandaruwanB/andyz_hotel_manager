<script setup>
import { onMounted, ref } from 'vue';

const model = defineModel({
    type: String,
    required: true,
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input
        class="py-1 border-gray-200 rounded-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
        v-model="model"
        ref="input"
    />
</template>
