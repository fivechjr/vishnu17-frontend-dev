<template>
    <Layout v-if="data">
        <div class="w-full flex justify-center">
            <div class="w-full md:w-2/3">
                <form ref="form" @submit.prevent="submit">
                    <Module>
                        <template slot="content">
                            <div class="px-8 py-6">
                                <div class="flex flex-row justify-between items-center">
                                    <p class="text-xl font-medium">Edit Bag</p>
                                    <p
                                        class="text-xs text-red-600 font-medium tracking-wide uppercase cursor-pointer"
                                        @click="deleteBag"
                                    >Delete Bag</p>
                                </div>
                                <Spacer />
                                <InputField
                                    label="Description"
                                    type="text"
                                    name="description"
                                    v-model="form.description"
                                />
                                <Spacer />
                                <InputField
                                    label="Current Location"
                                    type="text"
                                    name="current_location"
                                    v-model="form.current_location"
                                />
                                <Spacer />
                                <InputField label="Image" type="file" name="image" />
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
                                        <Button size="small" type="submit">Update</Button>
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
import Layout from "@/components/layout";
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import InputField from "@/components/input-field";
import Button from "@/components/button";
import * as participantService from "@/services/participant-service";

export default {
    components: {
        Layout,
        Module,
        Spacer,
        InputField,
        Button
    },
    async mounted() {
        try {
            const bag = await participantService.getBag({
                id: this.$route.params.id,
                bag: this.$route.params.bag
            });
            const data = bag.data;
            this.data = data;
            this.form = { ...this.data };
        } catch (e) {
            this.$router.push({
                name: "Profile",
                params: { id: this.$route.params.id }
            });
        }
    },
    data: function() {
        return {
            data: {},
            form: {}
        };
    },
    methods: {
        submit: async function() {
            const form = new FormData(this.$refs.form);
            try {
                await participantService.updateBag({
                    id: this.$route.params.id,
                    bag: this.$route.params.bag,
                    form
                });
                alert("Updated.");
                this.$router.push({
                    name: "Profile",
                    params: { id: this.$route.params.id }
                });
            } catch (e) {
                alert(e.response.data.message);
            }
        },
        deleteBag: async function() {
            // console.log("deleee");
            try {
                await participantService.deleteBag({
                    id: this.$route.params.id,
                    bag: this.$route.params.bag
                });
                alert("Deleted.");
                this.$router.push({
                    name: "Profile",
                    params: { id: this.$route.params.id }
                });
            } catch (e) {
                alert(e.response.data.message);
            }
        }
    }
};
</script>
