<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Basic Information</p>
                <Spacer />
                <DataField label="NAME" :value="data.name" />
                <DataField label="STUDENT ID" :value="data.id" />
                <DataField
                    label="MAJOR"
                    :value="data.major && data.major !== null ? 'ภาค' + data.major : data.major"
                />
                <DataField label="HOUSE" :value="data.house" />
                <DataField label="GROUP" :value="data.group" />
                <DataField label="HIGH SCHOOL" :value="data.highSchool" />
                <DataField label="DATE OF BIRTH" :value="data.birthday" />
                <DataField label="STAY" :value="data.stay" />
                <DataField label="PREFERRED ROUTE" :value="data.preferredRoute" />
                <DataField label="SHIRT SIZE" :value="data.shirtSize" />
                <DataField label="DIVISION" :value="data.division" :last="true" />
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
    }
};
</script>
