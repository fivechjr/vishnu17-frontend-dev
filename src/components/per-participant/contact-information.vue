<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Contact Information</p>
                <Spacer />
                <DataField :is-editing="isEditing" label="PHONE" v-model="form.phone" />
                <DataField :is-editing="isEditing" label="LINE" v-model="form.line" />
                <DataField :is-editing="isEditing" label="FACEBOOK" v-model="form.facebook" />
                <DataField :is-editing="isEditing" label="INSTAGRAM" v-model="form.instagram" />
                <DataField :is-editing="isEditing" label="PARENT NAME" v-model="form.parent_name" />
                <DataField
                    :is-editing="isEditing"
                    label="PARENT PHONE"
                    v-model="form.parent_phone"
                />
                <DataField
                    :is-editing="isEditing"
                    label="ADDRESS"
                    v-model="form.address"
                    :last="true"
                />
            </div>
        </template>
        <template slot="footer">
            <Footer
                v-model="isEditing"
                :last-updated="data.updated_at || data.created_at"
                @save="update"
                @cancel="revert"
                :edit-permission="$store.getters.hasPermission('people.contact.update')"
            />
        </template>
    </Module>
</template>

<script>
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import DataField from "@/components/data-field";
import Button from "@/components/button";
import Footer from "@/components/per-participant/footer";
import * as participantService from "@/services/participant-service";
export default {
    props: ["id", "data"],
    components: {
        Module,
        Spacer,
        DataField,
        Button,
        Footer
    },
    mounted() {
        this.form = { ...this.data };
    },
    data: function() {
        return {
            isEditing: false,
            form: {}
        };
    },
    methods: {
        update: async function() {
            try {
                await participantService.updateContactInformation(
                    this.id,
                    this.form
                );
                alert("Updated.");
            } catch (e) {
                alert(e.response.data.message);
            } finally {
                this.$emit("refresh");
            }
        },
        revert: function() {
            this.form = { ...this.data };
        }
    },
    watch: {
        data: function(d) {
            this.form = { ...this.data };
        }
    }
};
</script>
