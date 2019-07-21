<template>
    <button
        :class="{ 'small': size === 'small', 'secondary': variant === 'secondary' }"
        :type="type"
        :style="'height: ' + (size === 'small' ? '30px' : '40px')"
    >
        <slot />
    </button>
</template>

<style lang="less" scoped>
* {
    transition: all 0.25s;
}

button {
    @apply font-medium;
    @apply text-sm;
    @apply text-white;
    @apply border;
    @apply border-gray-8;
    @apply bg-gray-8;
    @apply px-4;
    @apply rounded;
    &.small {
        @apply text-xs;
    }
    &.secondary {
        @apply border-gray-2;
        @apply text-gray-3;
        @apply bg-transparent;
    }
    &:hover {
        @apply text-black;
        @apply bg-transparent;
        @apply border-gray-8;
    }
}
</style>

<script>
export default {
    props: ["type", "size", "variant"]
};
</script>
