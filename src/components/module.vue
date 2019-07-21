<template>
    <div class="w-full flex flex-col rounded shadow-lg">
        <div class="bg-white rounded-tl rounded-tr text-sm">
            <slot name="content" />
        </div>
        <div class="bg-gray-1 rounded-bl rounded-br text-gray-6 text-xs">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {};
</script>
