<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Change Status</p>
                <Spacer />
                <Select
                    label="STATUS"
                    :options="$store.getters.getOptions('property-actions')"
                    v-model="form.action"
                />
                <Spacer />
                <InputField label="NOTE (OPTIONAL)" v-model="form.note" />
            </div>
        </template>
        <template slot="footer">
            <div class="w-full px-8 py-4">
                <div class="flex justify-end items-center">
                    <div class="flex flex-shrink-0">
                        <Button size="small" type="submit" @click.native="change">Change</Button>
                    </div>
                </div>
            </div>
        </template>
    </Module>
</template>

<script>
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import InputField from "@/components/input-field";
import Button from "@/components/button";
import Select from "@/components/select";
import * as propertyService from "@/services/property-service";
export default {
    props: ["id", "data"],
    components: {
        Module,
        Spacer,
        InputField,
        Button,
        Select
    },
    data: function() {
        return {
            form: {
                action: "",
                note: ""
            }
        };
    },
    methods: {
        change: async function() {
            try {
                await propertyService.updateStatus(this.id, this.form);
                alert("Updated.");
            } catch (e) {
                console.log(e);
                alert(e.response.data.message);
            } finally {
                this.form = {
                    action: "",
                    note: ""
                };
                this.$emit("refresh");
            }
        }
    }
};
</script>
