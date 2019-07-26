<template>
    <Layout>
        <div class="w-full flex justify-center">
            <div class="w-full md:w-2/3">
                <form ref="form" @submit.prevent="submit" novalidate>
                    <Module>
                        <template slot="content">
                            <div class="px-8 py-6">
                                <p class="text-xl font-medium">Add Lost Property</p>
                                <Spacer />
                                <InputField label="NAME" type="text" name="name" />
                                <Spacer />
                                <InputField label="DESCRIPTION" type="text" name="description" />
                                <Spacer />
                                <InputField label="WHEN" type="datetime-local" name="when" />
                                <Spacer />
                                <InputField label="LOCATION" type="text" name="location" />
                                <Spacer />
                                <InputField label="IMAGE" type="file" name="image" />
                            </div>
                        </template>
                        <template slot="footer">
                            <div class="w-full px-8 py-4">
                                <div class="flex justify-between items-center">
                                    <div class="flex flex-shrink-0">
                                        <Button
                                            size="small"
                                            variant="secondary"
                                            type="button"
                                            @click.native="$router.push({
                                                name: 'All Properties',
                                            })"
                                        >Go Back</Button>
                                    </div>
                                    <div class="flex ml-8 flex-shrink-0">
                                        <Button size="small" type="submit">Add</Button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Module>
                </form>
            </div>
        </div>
    </Layout>
</template>

<script>
import dayjs from "dayjs";
import Layout from "@/components/layout";
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import InputField from "@/components/input-field";
import Button from "@/components/button";
import * as propertyService from "@/services/property-service";

export default {
    components: {
        Layout,
        Module,
        Spacer,
        InputField,
        Button
    },
    methods: {
        submit: async function() {
            const form = new FormData(this.$refs.form);
            const when =
                form.get("when") && form.get("when") !== ""
                    ? dayjs(new Date(form.get("when")).getTime()).format(
                          "YYYY-MM-DD HH:mm:ss"
                      )
                    : "";
            form.set("when", when);
            // console.log("when", when);
            try {
                await propertyService.addProperty(form);
                alert("Added.");
                // Too lazy to clear the input fields;
                // Go reload;
                window.location.reload(true);
            } catch (e) {
                // console.log(e);
                alert(e.response.data.message);
            }
        }
    }
};
</script>
