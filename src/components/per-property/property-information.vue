<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Property Information</p>
                <Spacer />
                <DataField label="NAME" :value="data.name" />
                <DataField label="DESCRIPTION" :value="data.description" />
                <DataField label="WHEN" :value="when" />
                <DataField label="LOCATION" :value="data.location" :last="true" />
            </div>
        </template>
        <template slot="footer">
            <div class="px-8 py-4">
                <p>This information cannot be updated.</p>
            </div>
        </template>
    </Module>
</template>

<script>
import { parseDateTime } from "@/utils/time";
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import DataField from "@/components/data-field";
import Button from "@/components/button";
export default {
    props: ["data"],
    components: {
        Module,
        Spacer,
        DataField,
        Button
    },
    mounted() {
        console.log(this.data);
    },
    computed: {
        when: function() {
            if (this.data.when) {
                return parseDateTime(this.data.when);
            } else {
                return "";
            }
        }
    }
};
</script>
