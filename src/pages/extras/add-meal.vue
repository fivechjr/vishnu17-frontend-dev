<template>
    <Layout>
        <div class="w-full flex justify-center">
            <div class="w-full md:w-2/3">
                <form ref="form" @submit.prevent="submit" novalidate>
                    <Module>
                        <template slot="content">
                            <div class="px-8 py-6">
                                <p class="text-xl font-medium">Add Meal</p>
                                <Spacer />
                                <InputField label="WHEN" type="date" v-model="form.when" />
                                <Spacer />
                                <InputField label="NOTE" type="text" v-model="form.note" />
                                <Spacer />
                                <Select
                                    label="MEAL"
                                    :options="$store.getters.getOptions('meal-options')"
                                    v-model="form.time"
                                />
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
                                            name: 'Profile',
                                            params: { id: $route.params.id }
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
import Select from "@/components/select";
import Button from "@/components/button";
import * as participantService from "@/services/participant-service";

export default {
    components: {
        Layout,
        Module,
        Spacer,
        InputField,
        Button,
        Select
    },
    data: function() {
        return {
            form: {
                when: "",
                note: "",
                time: ""
            }
        };
    },
    methods: {
        submit: async function() {
            const form = new FormData(this.$refs.form);
            try {
                const when = dayjs(
                    new Date(this.form.when).toISOString()
                ).format("YYYY-MM-DD");
                console.log(when);
                await participantService.addMeal(this.$route.params.id, {
                    ...this.form,
                    when,
                    want: 1
                });
                alert("Added.");
                // Too lazy to clear the input fields;
                // Go reload;
                this.$router.push({
                    name: "Profile",
                    params: { id: this.$route.params.id }
                });
            } catch (e) {
                console.log(e);
                alert(e.response.data.message);
            }
        }
    }
};
</script>
