<template>
    <div class="text-sm w-full flex flex-row items-baseline border-b" style="min-width: 768px">
        <div class="w-2/6 flex flex-row items-center px-4 py-3">
            <div class="w-8 flex-shrink-0 flex mr-4">
                <p class="text-sm text-gray-4">{{index}}</p>
            </div>
            <div class="flex flex-col">
                <router-link
                    target="_blank"
                    :to="{
                name: 'Profile',
                params: { id: data.person_id }
            }"
                >
                    <span
                        class="text-sm text-black truncate"
                    >{{data.person.first_name}} {{data.person.last_name}}</span>
                </router-link>
                <span class="text-sm text-gray-3 truncate">{{data.person.student_id}}</span>
            </div>
        </div>
        <div class="w-2/6 flex flex-col px-4 py-3">
            <span class="text-sm text-black">{{data.person.health_profile.food_allergy || 'N/A'}}</span>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <span class="text-sm text-gray-3 truncate">{{when}}</span>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <span class="text-xs text-gray-3 tracking-wide uppercase truncate">{{data.time}}</span>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";
export default {
    props: ["data", "index"],
    computed: {
        when: function() {
            if (this.data.when) {
                return dayjs(this.data.when).format("YYYY-MM-DD");
            } else {
                return "N/A";
            }
        }
    }
};
</script>
