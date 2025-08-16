<script setup>
const props = defineProps({
    width: {
        type: Number,
        required: true,
    },
    height : {
        type: Number,
        required : true
    }
});
</script>

<template>
    <img src="/images/logo.svg" alt="logo" :width="width" :height="height" />
</template>
