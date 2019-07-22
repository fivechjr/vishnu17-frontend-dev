<template>
    <Layout>
        <div v-if="property" class="w-full flex justify-center">
            <div class="w-full md:w-2/3">
                <PropertyInformation
                    :id="property.id"
                    :data="propertyInformation"
                    @refresh="refresh"
                />
                <div class="flex flex-row mb-12" />
                <Statuses :id="property.id" :data="statuses" @refresh="refresh" />
                <div class="flex flex-row mb-12" />
                <ChangeStatus :id="property.id" @refresh="refresh" />
            </div>
        </div>
        <NotFound v-else />
    </Layout>
</template>

<script>
import Layout from "@/components/layout";
import PropertyInformation from "@/components/per-property/property-information";
import Statuses from "@/components/per-property/statuses";
import ChangeStatus from "@/components/per-property/change-status";
import * as propertyService from "@/services/property-service";
import NotFound from "@/components/not-found";

export default {
    components: {
        Layout,
        PropertyInformation,
        ChangeStatus,
        Statuses,
        NotFound
    },
    async mounted() {
        await this.getPropertyInfo();
    },
    data: function() {
        return {
            propertyInformation: {},
            statuses: [],
            property: null
        };
    },
    methods: {
        getPropertyInfo: async function() {
            const id = this.$route.params.id;
            try {
                const property = await propertyService.getInfo(id);
                const data = property.data;
                this.property = data;

                // Basic Information
                this.propertyInformation = { ...data };

                // Statuses
                this.statuses = [...data.actions];

                console.log(this.statuses);
            } catch (e) {
                console.log(e);
                //
            }
        },
        refresh: async function() {
            await this.getPropertyInfo();
        }
    }
};
</script>
