<script setup>
import { ref } from 'vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import NavDropdown from '@/Components/NavDropdown.vue';
import NavDropdownLink from '@/Components/NavDropdownLink.vue';
import { Link } from '@inertiajs/vue3';

const props = defineProps({
    navItems: {
        type: Array,
        default: () => []
    }
});

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-200">
            <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
                <div class="max-w-full px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-14">
                        <div class="flex">
                            <div class="flex items-center shrink-0">
                                <Link
                                    :href="route('dashboard')"
                                    class="group relative p-3 text-gray-600 transition-all duration-300 hover:text-gray-900 hover:bg-gray-100 rounded-lg hover:shadow-lg hover:-translate-y-0.5 hover:scale-105"
                                >
                                    <svg class="w-6 h-6 transition-opacity duration-300 group-hover:opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>

                                    <svg class="absolute inset-0 w-6 h-6 m-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>

                                    <div class="absolute z-10 px-2 py-1 mt-2 text-xs text-white transition-opacity duration-300 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 left-1/2 top-full group-hover:opacity-100 whitespace-nowrap">
                                        Back to Dashboard
                                    </div>
                                </Link>
                            </div>

                            <div class="hidden space-x-2 sm:-my-px sm:ms-10 sm:flex">
                                <template v-for="navItem in navItems" :key="navItem.name">
                                    <NavLink
                                        v-if="!navItem.children || navItem.children.length === 0"
                                        :href="navItem.route ? route(navItem.route) : navItem.href || '#'"
                                        :active="navItem.route ? route().current(navItem.route) : false"
                                        class="inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out border-b-2 focus:outline-none"
                                    >
                                        <svg v-if="navItem.icon" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="navItem.icon" />
                                        </svg>
                                        {{ navItem.name }}
                                    </NavLink>

                                    <div v-else class="relative flex items-center">
                                        <NavDropdown align="left" width="56">
                                            <template #trigger>
                                                <button class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50">
                                                    <svg v-if="navItem.icon" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="navItem.icon" />
                                                    </svg>
                                                    {{ navItem.name }}
                                                    <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                    </svg>
                                                </button>
                                            </template>

                                            <template #content>
                                                <div class="py-1">
                                                    <template v-for="child in navItem.children" :key="child.name">
                                                        <div v-if="child.type === 'header'" class="px-4 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase bg-gray-50">
                                                            {{ child.name }}
                                                        </div>
                                                        <div v-else-if="child.type === 'divider'" class="my-1 border-t border-gray-100"></div>
                                                        <NavDropdownLink
                                                            v-else
                                                            :href="child.route ? route(child.route) : child.href || '#'"
                                                        >
                                                            <div class="flex items-center">
                                                                <svg v-if="child.icon" class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="child.icon" />
                                                                </svg>
                                                                <div>
                                                                    <div class="font-medium text-gray-700">{{ child.name }}</div>
                                                                    <div v-if="child.description" class="text-xs text-gray-500 mt-0.5">{{ child.description }}</div>
                                                                </div>
                                                            </div>
                                                        </NavDropdownLink>
                                                    </template>
                                                </div>
                                            </template>
                                        </NavDropdown>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="hidden sm:ms-6 sm:flex sm:items-center">
                            <div class="relative ms-3">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none"
                                            >
                                                {{ $page.props.auth.user.name }}

                                                <svg
                                                    class="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <DropdownLink :href="route('profile.edit')">
                                            Profile
                                        </DropdownLink>
                                        <DropdownLink :href="route('logout')" method="post" as="button">
                                            Log Out
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <div class="flex items-center -me-2 sm:hidden">
                            <button
                                @click="showingNavigationDropdown = !showingNavigationDropdown"
                                class="inline-flex items-center justify-center p-2 text-gray-400 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex': !showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex': showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    :class="{
                        block: showingNavigationDropdown,
                        hidden: !showingNavigationDropdown,
                    }"
                    class="bg-white border-t border-gray-200 sm:hidden"
                >
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink :href="route('dashboard')" :active="route().current('dashboard')">
                            Dashboard
                        </ResponsiveNavLink>

                        <template v-for="navItem in navItems" :key="'mobile-' + navItem.name">
                            <ResponsiveNavLink
                                v-if="!navItem.children || navItem.children.length === 0"
                                :href="navItem.route ? route(navItem.route) : navItem.href || '#'"
                                :active="navItem.route ? route().current(navItem.route) : false"
                            >
                                {{ navItem.name }}
                            </ResponsiveNavLink>

                            <div v-else class="pl-4">
                                <div class="py-2 text-sm font-medium text-gray-600">{{ navItem.name }}</div>
                                <template v-for="child in navItem.children" :key="'mobile-child-' + child.name">
                                    <ResponsiveNavLink
                                        v-if="child.type !== 'header' && child.type !== 'divider'"
                                        :href="child.route ? route(child.route) : child.href || '#'"
                                        class="pl-4"
                                    >
                                        {{ child.name }}
                                    </ResponsiveNavLink>
                                </template>
                            </div>
                        </template>
                    </div>

                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="px-4">
                            <div class="text-base font-medium text-gray-800">
                                {{ $page.props.auth.user.name }}
                            </div>
                            <div class="text-sm font-medium text-gray-500">
                                {{ $page.props.auth.user.email }}
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')">
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="pt-14">
                <header class="bg-white shadow" v-if="$slots.header">
                    <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <slot name="header" />
                    </div>
                </header>
                <main>
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>

