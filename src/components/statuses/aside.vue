<template>
    <aside>
        <div class="sticky top-0 px-6 py-6 bg-gray-1 cursor-pointer" @click="$emit('close')">
            <p class="text-xs uppercase tracking-wide text-gray-6 cursor-pointer">FILTERING</p>
        </div>
        <Spacer />
        <div class="px-6">
            <Select
                label="METHOD"
                empty="ทั้งหมด"
                :options="[{ name: 'ตามบ้าน', value: 'house' }, { name: 'ตามฝ่าย', value: 'division' }]"
                v-model="method"
            />
            <Spacer v-if="useHouseMethod" />
            <Select
                v-if="useHouseMethod"
                label="HOUSE"
                :options="$store.getters.getOptions('houses')"
                v-model="extra"
            />
            <Spacer v-if="useDivisionMethod" />
            <Select
                v-if="useDivisionMethod"
                label="DIVISION"
                :options="$store.getters.getOptions('divisions')"
                v-model="extra"
            />
            <Spacer />
            <div class="flex justify-end">
                <Button size="small" @click.native="applyFiltering">Apply Filtering</Button>
            </div>
            <Spacer />
        </div>
    </aside>
</template>

<style lang="less" scoped>
aside {
    @apply w-full;
    max-width: 300px;
    @apply fixed;
    @apply z-20;
    @apply bg-white;
    @apply top-0;
    @apply left-0;
    height: 100%;
    @apply shadow-lg;
    @apply overflow-y-scroll;
}
</style>

<script>
import Select from "@/components/select";
import Spacer from "@/components/spacer";
import Button from "@/components/button";
export default {
    components: {
        Select,
        Spacer,
        Button
    },
    data: function() {
        return {
            method: "",
            extra: ""
        };
    },
    methods: {
        applyFiltering: function() {
            this.$emit("applyFiltering", {
                method: this.method,
                extra: this.extra
            });
        }
    },
    computed: {
        useHouseMethod: function() {
            return this.method === "house";
        },
        useDivisionMethod: function() {
            return this.method === "division";
        }
    },
    watch: {
        method: function(v) {
            this.extra = "";
        }
    }
};
</script>
