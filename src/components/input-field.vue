<template>
    <div class="flex flex-col text-sm">
        <p
            v-if="label"
            class="text-xs text-gray-4 tracking-wide uppercase mb-2 select-none cursor-default"
        >{{label}}</p>
        <input
            :class="type !== 'file' ? 'w-full px-4 rounded border focus:border-black flex justify-center items-center appearance-none' : ''"
            :name="name"
            :type="type"
            :placeholder="placeholder"
            style="height: 40px"
            :value="value"
            @input="e => $emit('input', e.target.value)"
        />
    </div>
</template>

<style scoped>
* {
    transition: all 0.25s;
}

input::placeholder {
    @apply text-xs;
    @apply tracking-wide;
    @apply uppercase;
    opacity: 1;
    @apply text-gray-3;
}
</style>


<script>
export default {
    props: ["label", "type", "placeholder", "value", "name"]
};
</script>
