<template>
    <Layout>
        <div v-if="participant !== null" class="w-full flex justify-center">
            <div class="w-full md:w-2/3">
                <BasicInformation :id="participant.id" :data="basicInformation" @refresh="refresh" />
                <div class="flex flex-row mb-12" />
                <Statuses :id="participant.id" :data="statuses" @refresh="refresh" />
                <div class="flex flex-row mb-12" />
                <Meals :id="participant.id" :data="meals" @refresh="refresh" />
                <div class="flex flex-row mb-12" />
                <HealthProfile :id="participant.id" :data="healthProfile" @refresh="refresh" />
                <div class="flex flex-row mb-12" />
                <ContactInformation
                    :id="participant.id"
                    :data="contactInformation"
                    @refresh="refresh"
                />
                <div class="flex flex-row mb-12" />
                <Bags :id="participant.id" :data="bags" />
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "@/components/layout";
import BasicInformation from "@/components/per-participant/basic-information";
import ContactInformation from "@/components/per-participant/contact-information";
import Statuses from "@/components/per-participant/statuses";
import HealthProfile from "@/components/per-participant/health-profile";
import Bags from "@/components/per-participant/bags";
import Meals from "@/components/per-participant/meals";
import * as participantService from "@/services/participant-service";

export default {
    components: {
        Layout,
        BasicInformation,
        ContactInformation,
        Statuses,
        HealthProfile,
        Bags,
        Meals
    },
    async mounted() {
        await this.getParticipantInfo();
    },
    data: function() {
        return {
            formState: {
                contact: true
            },
            basicInformation: {},
            statuses: [],
            meals: [],
            healthProfile: {},
            bags: [],
            meals: [],
            contactInformation: {},
            participant: null
        };
    },
    methods: {
        getParticipantInfo: async function() {
            const id = this.$route.params.id;
            try {
                const participant = await participantService.getInfo(id);
                const data = participant.data;
                this.participant = data;

                // Basic Information
                this.basicInformation = {
                    name: `${data.first_name} ${data.last_name} (${data.nickname})`,
                    major: data.academic_program?.name,
                    house: data.baan?.name,
                    group: data.baan?.group,
                    highSchool: data.high_school,
                    birthday: null,
                    stay: data.stay_overnight,
                    preferredRoute: data.preferred_route,
                    shirtSize: data.clothing_size,
                    division: data.division?.name,
                    id: data.student_id
                };

                // Health Profile
                this.healthProfile = { ...data.health_profile };

                // Contact Information
                this.contactInformation = { ...data.contact };

                // Bags
                this.bags = [...data.bags];

                // Statuses
                this.statuses = [...data.statuses];

                // Meals
                this.meals = [...data.meal_options];
            } catch (e) {
                console.log(e);
                //
            }
        },
        refresh: async function() {
            await this.getParticipantInfo();
        }
    }
};
</script>
