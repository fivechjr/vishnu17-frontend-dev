<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Statuses</p>
                <Spacer />
                <div v-if="data && data.length > 0">
                    <DataField
                        v-for="(d, index) in data"
                        :key="d.id"
                        :label="d.detail.updated_at"
                        :value="getStatusName(d)"
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
                        <strong class="font-medium">{{data ? data.length : '0'}}</strong> Statuses
                    </p>
                </div>
            </div>
        </template>
    </Module>
</template>

<script>
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
        getStatusName: function(status) {
            if (status.detail.note) {
                return status.name + " · " + status.detail.note;
            } else {
                return status.name;
            }
        }
    }
};
</script>
