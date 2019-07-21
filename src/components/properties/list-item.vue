<template>
    <div class="text-sm w-full flex flex-row items-baseline border-b" style="min-width: 768px">
        <div class="w-2/6 flex flex-col px-4 py-3">
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
    props: ["data"],
    computed: {
        latestStatus: function() {
            if (this.data && this.data.actions.length > 0) {
                return this.data.actions[0]?.name;
            } else {
                return "N/A";
            }
        }
    }
};
</script>
