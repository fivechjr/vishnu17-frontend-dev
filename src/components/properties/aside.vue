<template>
    <aside>
        <div class="sticky top-0 px-6 py-6 bg-gray-1" @click="$emit('close')">
            <p class="text-xs uppercase tracking-wide text-gray-6">SORTING</p>
        </div>
        <Spacer />
        <div class="px-6">
            <Select
                label="FIRST NAME"
                empty="No Sorting"
                :options="$store.getters.getOptions('sorting-directions')"
                v-model="sorting.first_name"
            />
            <Spacer />
            <Select
                label="YEAR"
                empty="No Sorting"
                :options="$store.getters.getOptions('sorting-directions')"
                v-model="sorting.year"
            />
            <Spacer />
            <Select
                label="STUDENT ID"
                empty="No Sorting"
                :options="$store.getters.getOptions('sorting-directions')"
                v-model="sorting.student_id"
            />
            <Spacer />
            <div class="flex justify-end">
                <Button size="small" @click.native="applySorting">Apply Sorting</Button>
            </div>
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
            sorting: {
                first_name: "",
                year: "",
                student_id: ""
            }
        };
    },
    methods: {
        applySorting: function() {
            this.$emit("apply", this.sorting);
        }
    }
};
</script>
