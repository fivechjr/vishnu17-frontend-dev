<template>
    <div class="flex flex-col text-sm">
        <p v-if="label" class="text-xs text-gray-4 tracking-wide uppercase mb-2">{{label}}</p>
        <select
            class="w-full px-4 rounded border focus:border-black flex justify-center items-center appearance-none bg-white cursor-pointer"
            :value="value"
            @change="handleChange"
            style="height: 40px"
        >
            <option value selected :disabled="!empty">{{empty || 'Select'}}</option>
            <option v-for="opt in options" :key="opt.value" :value="opt.value">{{opt.name}}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ["options", "value", "label", "empty"],
    methods: {
        handleChange: function(e) {
            this.$emit("input", e.target.value);
        }
    }
};
</script>
