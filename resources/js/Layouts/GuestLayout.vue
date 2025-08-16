<script setup>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div
        class="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:pt-0 sm:px-2"
    >
        <div
            class="w-full px-3 py-4 mt-6 overflow-hidden bg-white sm:max-w-[300px] sm:rounded-md"
        >
            <Link href="/" class="flex flex-col items-center justify-center my-4">
                <ApplicationLogo :width="40" :height="40" />
                <span class="text-[1rem] text-blue-900 font-semibold font-serif d-block">andyZ</span>
                <span class="text-[.77rem] text-gray-700 d-block">Hotel Manager</span>
            </Link>
            <slot />
        </div>
    </div>
</template>
