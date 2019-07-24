<template>
    <aside>
        <div class="sticky top-0 px-6 py-6 bg-gray-1 cursor-pointer" @click="$emit('close')">
            <p class="text-xs uppercase tracking-wide text-gray-6 cursor-pointer">FILTER & SORTING</p>
        </div>
        <Spacer />
        <div class="px-6">
            <Select
                label="FILTER · HOUSE"
                :options="$store.getters.getOptions('houses')"
                v-model="filters.baan_id"
            />
            <Spacer />
            <Select
                label="FILTER · GENDER"
                :options="$store.getters.getOptions('genders')"
                v-model="filters.sex"
            />
            <Spacer />
            <Select
                label="FILTER · YEAR"
                :options="$store.getters.getOptions('years')"
                v-model="filters.year"
            />
            <Spacer />
            <InputField label="FILTER · FIRST NAME" type="text" v-model="filters.first_name" />
            <Spacer />
            <InputField label="FILTER · LAST NAME" type="text" v-model="filters.last_name" />
            <Spacer />
            <div class="flex justify-end">
                <Button size="small" @click.native="applyFiltering">Apply Filtering</Button>
            </div>
            <Spacer />
            <Select
                label="SORT · FIRST NAME"
                empty="Default"
                :options="$store.getters.getOptions('sorting-directions')"
                v-model="sorting.first_name"
            />
            <Spacer />
            <Select
                label="SORT · YEAR"
                empty="Default"
                :options="$store.getters.getOptions('sorting-directions')"
                v-model="sorting.year"
            />
            <Spacer />
            <Select
                label="SORT · STUDENT ID"
                empty="Default"
                :options="$store.getters.getOptions('sorting-directions')"
                v-model="sorting.student_id"
            />
            <Spacer />
            <div class="flex justify-end">
                <Button size="small" @click.native="applySorting">Apply Sorting</Button>
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
import InputField from "@/components/input-field";
export default {
    components: {
        Select,
        Spacer,
        Button,
        InputField
    },
    data: function() {
        return {
            sorting: {
                first_name: "",
                year: "",
                student_id: ""
            },
            filters: {
                baan_id: "",
                sex: "",
                year: "",
                first_name: "",
                last_name: ""
            }
        };
    },
    methods: {
        applySorting: function() {
            this.$emit("applySorting", this.sorting);
        },
        applyFiltering: function() {
            this.$emit("applyFiltering", this.filters);
        }
    }
};
</script>
