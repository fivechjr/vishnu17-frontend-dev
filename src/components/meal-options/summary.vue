<template>
    <div class="shadow rounded">
        <div class="px-8 py-6">
            <p class="text-xl font-medium">
                Summary
                <strong>{{date}}</strong>
                : {{meal.charAt(0).toUpperCase() + meal.slice(1).toLowerCase()}}
            </p>
            <Spacer />
            <div v-for="(s, group, index) in summary" :key="group">
                <details>
                    <summary>
                        <span class="text-sm text-gray-4 cursor-pointer">
                            <span class="font-medium text-black">{{s.group}}</span>
                            - {{s.name}}
                        </span>
                    </summary>
                    <div class="flex flex-col">
                        <Spacer />
                        <p class="text-xs tracking-wide cursor-pointer">
                            <span>FRESHY</span>
                            :
                            <strong
                                class="font-medium text-blue-2"
                            >{{s.data.freshy.total}}</strong>
                        </p>
                        <Spacer />
                        <div
                            class="px-8 py-6 flex flex-col text-sm rounded bg-orange-100 text-orange-500"
                        >
                            <span class="font-medium text-xs tracking-wide mb-2">FOOD ALLERGIES</span>
                            <p class="text-sm">{{s.data.freshy.food_allergies.join(', ')}}</p>
                        </div>
                        <Spacer />
                        <p class="text-xs tracking-wide cursor-pointer">
                            <span>STAFF</span>
                            :
                            <strong
                                class="font-medium text-blue-2"
                            >{{s.data.staff.total}}</strong>
                        </p>
                        <Spacer />
                        <div
                            class="px-8 py-6 flex flex-col text-sm rounded bg-orange-100 text-orange-500"
                        >
                            <span class="font-medium text-xs tracking-wide mb-2">FOOD ALLERGIES</span>
                            <p class="text-sm">{{s.data.staff.food_allergies.join(', ')}}</p>
                        </div>
                    </div>
                </details>
                <Spacer v-if="(index != Object.keys(summary).length - 1)" />
            </div>
        </div>
    </div>
</template>

<script>
import Spacer from "@/components/spacer";
export default {
    props: ["date", "meal", "summary"],
    components: {
        Spacer
    }
};
</script>
