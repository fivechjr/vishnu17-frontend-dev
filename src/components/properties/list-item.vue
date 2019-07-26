<template>
    <div class="text-sm w-full flex flex-row items-center border-b" style="min-width: 768px">
        <div class="w-2/6 flex flex-row items-center px-4 py-3">
            <div class="w-8 flex-shrink-0 flex mr-4">
                <p class="text-sm text-gray-4">{{computedIndex}}</p>
            </div>
            <router-link
                target="_blank"
                :to="{
                name: 'Property',
                params: { id: data.id }
            }"
            >
                <span class="text-sm text-black truncate">{{data.name}}</span>
            </router-link>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <span class="text-sm text-gray-3 truncate">{{data.location}}</span>
        </div>
        <div class="w-2/6 flex flex-col px-4 py-3">
            <span class="text-sm text-gray-3 truncate">{{data.when}}</span>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3 truncate">{{latestStatus}}</div>
    </div>
</template>

<script>
export default {
    props: ["data", "index"],
    computed: {
        latestStatus: function() {
            if (this.data.actions && this.data.actions.length > 0) {
                return this.data.actions[0]?.name;
            } else {
                return "N/A";
            }
        },
        computedIndex: function() {
            return this.index;
        }
    }
};
</script>
