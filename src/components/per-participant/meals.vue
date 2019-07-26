<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Meals</p>
                <Spacer />
                <div v-if="data && data.length > 0">
                    <DataField
                        v-for="(d, index) in data"
                        :key="d.id"
                        :label="getLabel(d)"
                        :value="getTitle(d)"
                        :last="index === data.length - 1"
                    />
                </div>
                <NotFound v-else />
            </div>
        </template>
        <template slot="footer">
            <div class="w-full px-8 py-4">
                <div class="flex justify-between items-center">
                    <p>
                        <strong class="font-medium">{{data ? data.length : '0'}}</strong> Meals
                    </p>
                    <div class="flex ml-8 flex-shrink-0">
                        <Button
                            size="small"
                            @click.native="$router.push({
                                    name: 'Add Meal',
                                    params: { id }
                                })"
                        >Add</Button>
                    </div>
                </div>
            </div>
        </template>
    </Module>
</template>

<script>
import dayjs from "dayjs";
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import DataField from "@/components/data-field";
import Button from "@/components/button";
import NotFound from "@/components/not-found";
export default {
    props: ["id", "data"],
    components: {
        Module,
        Spacer,
        DataField,
        Button,
        NotFound
    },
    methods: {
        getTitle: function(m) {
            if (m.note) {
                return m.note;
            } else {
                return "N/A";
            }
        },
        getLabel: function(m) {
            return (
                dayjs(m.when).format("DD/MM") +
                " · " +
                m.amount +
                " · " +
                m.time.toUpperCase()
            );
        }
    }
};
</script>
