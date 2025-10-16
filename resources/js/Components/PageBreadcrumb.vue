<template>
  <nav class="flex items-center mb-6 space-x-2 text-sm text-gray-500" aria-label="Breadcrumb">
    <template v-for="(item, index) in items" :key="index">
      <div class="flex items-center">
        <svg
          v-if="index === 0 && item.isHome"
          class="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-3a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>

        <component
          :is="item.href ? 'a' : 'span'"
          :href="item.href"
          :class="[
            index === items.length - 1
              ? 'text-gray-900 font-medium'
              : 'text-gray-500 hover:text-gray-700 cursor-pointer'
          ]"
          @click="item.href ? null : handleClick(item)"
        >
          {{ item.label }}
        </component>
      </div>

      <svg
        v-if="index < items.length - 1"
        class="w-4 h-4 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
      </svg>
    </template>
  </nav>
</template>

<script>
export default {
  name: 'PageBreadcrumb',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  emits: ['navigate'],
  methods: {
    handleClick(item) {
      if (item.action) {
        this.$emit('navigate', item);
      }
    }
  }
};
</script>
