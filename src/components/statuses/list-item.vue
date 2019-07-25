<template>
    <div class="text-sm w-full flex flex-row items-center border-b" style="min-width: 768px">
        <div class="w-3/6 flex flex-row items-center px-4 py-3">
            <div class="w-8 flex-shrink-0 flex mr-4">
                <p class="text-sm text-gray-4">{{computedIndex}}</p>
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
                <span
                    class="text-sm text-gray-3 truncate"
                >{{data.person.student_id}} &mdash; ชั้นปีที่ {{data.person.year}}</span>
            </div>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <span
                class="text-xs uppercase tracking-wide"
                :class="isPresent ? 'text-teal-500' : (isUnexpected ? 'text-red-500': 'text-gray-4')"
            >{{latestStatus}}</span>
        </div>
        <div class="w-2/6 flex flex-col px-4 py-3">
            <span class="text-xs uppercase tracking-wide text-gray-4">{{data.updated_at}}</span>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button";
import * as participantService from "@/services/participant-service";
export default {
    props: ["data", "index"],
    components: {
        Button
    },
    mounted() {},
    computed: {
        latestStatus: function() {
            if (this.data.unexpected) {
                return "Unexpected";
            }

            if (this.data.present) {
                return "Present";
            } else {
                return "Absent";
            }
        },
        isPresent: function() {
            return this.data.present;
        },
        isUnexpected: function() {
            return this.data.unexpected;
        },
        computedIndex: function() {
            return this.index;
        }
    }
};
</script>
