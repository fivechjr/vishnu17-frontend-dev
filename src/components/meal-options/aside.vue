<template>
    <aside>
        <div class="sticky top-0 px-6 py-6 bg-gray-1" @click="$emit('close')">
            <p class="text-xs uppercase tracking-wide text-gray-6">FILTER & SORTING</p>
        </div>
        <Spacer />
        <div class="px-6">
            <InputField label="FILTER · DATE" type="date" v-model="filters.date" />
            <Spacer />
            <Select
                label="FILTER · MEAL"
                :options="$store.getters.getOptions('meal-options')"
                v-model="filters.time"
            />
            <Spacer />
            <Select
                label="FILTER · METHOD"
                :options="$store.getters.getOptions('meal-options:methods')"
                v-model="method"
            />
            <Spacer v-if="method === 'house'" />
            <Select
                v-if="method === 'house'"
                label="METHOD · HOUSE"
                :options="$store.getters.getOptions('houses')"
                v-model="extra"
            />
            <Spacer v-if="method === 'year'" />
            <Select
                v-if="method === 'year'"
                label="METHOD · YEAR"
                :options="$store.getters.getOptions('years')"
                v-model="extra"
            />
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
                date: "",
                time: ""
            },
            parameters: {
                method: "",
                extra: ""
            },
            method: "",
            extra: ""
        };
    },
    methods: {
        applySorting: function() {
            this.$emit("applySorting", this.sorting);
        },
        applyFiltering: function() {
            this.$emit("applyParametering", this.parameters);
            this.$emit("applyFiltering", this.filters);
        }
    },
    watch: {
        method: function(v) {
            this.parameters.method = v;
            this.extra = "";
            this.parameters.extra = "";
        },
        extra: function(v) {
            this.parameters.extra = v;
        }
    }
};
</script>
