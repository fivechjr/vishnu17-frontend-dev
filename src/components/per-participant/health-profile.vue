<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Health Profile</p>
                <Spacer />
                <DataField
                    :is-editing="isEditing"
                    label="MEDICAL HISTORY"
                    v-model="form.medical_history"
                />
                <DataField :is-editing="isEditing" label="MEDICATION" v-model="form.medication" />
                <DataField
                    :is-editing="isEditing"
                    label="GENERAL ALLERGY"
                    v-model="form.general_allergy"
                />
                <DataField
                    :is-editing="isEditing"
                    label="FOOD ALLERGY"
                    v-model="form.food_allergy"
                />
                <DataField
                    :is-editing="isEditing"
                    label="MEDICATION ALLERGY"
                    v-model="form.medication_allergy"
                    :last="true"
                />
            </div>
        </template>
        <template slot="footer">
            <Footer
                v-model="isEditing"
                :last-updated="data.updated_at"
                @cancel="revert"
                @save="update"
                :edit-permission="$store.getters.hasPermission('people.health_profile.update')"
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
                await participantService.updateHealthProfile(
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
