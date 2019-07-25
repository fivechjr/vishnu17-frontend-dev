<template>
    <div class="text-sm w-full flex flex-row items-center border-b" style="min-width: 768px">
        <div class="w-2/6 flex flex-row items-center px-4 py-3">
            <div class="w-8 flex-shrink-0 flex mr-4">
                <p class="text-sm text-gray-4">{{index}}</p>
            </div>
            <div class="flex flex-col">
                <router-link
                    target="_blank"
                    :to="{
                name: 'Profile',
                params: { id: data.id }
            }"
                >
                    <span
                        class="text-sm text-black truncate"
                    >{{participantData.first_name}} {{participantData.last_name}}</span>
                </router-link>
                <span
                    class="text-sm text-gray-3 truncate"
                >{{participantData.student_id}} &mdash; {{academicProgram}} ชั้นปีที่ {{participantData.year}}</span>
            </div>
        </div>
        <div class="w-2/6 flex flex-col px-4 py-3">
            <div v-if="isStatusDefined">
                <div v-if="!isMarked" class="flex">
                    <Button
                        size="small"
                        variant="secondary"
                        @click.native="markPresent"
                    >Mark Present</Button>
                </div>
                <span
                    v-else
                    class="text-xs uppercase tracking-wide"
                    :class="isPresent ? 'text-teal-500' : 'text-gray-4'"
                >{{isPresent ? 'Present' : 'Absent'}}</span>
            </div>
            <span v-else class="text-xs uppercase tracking-wide text-gray-4">NOT APPLICABLE</span>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <span
                class="text-sm"
                :class="gender === 'M' ? 'text-blue-2' : 'text-red-500'"
            >{{gender}}</span>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <div v-if="healthCondition" class="flex w-2 h-2 rounded-full bg-red-500"></div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button";
import * as participantService from "@/services/participant-service";
export default {
    props: ["data", "index"],
    components: {
        Button
    },
    data: function() {
        return {
            participantData: this.data
        };
    },
    mounted() {
        console.log(this.index);
    },
    methods: {
        markPresent: async function() {
            let confirmation = confirm(
                `Mark '${this.participantData.first_name} ${this.participantData.last_name}' ?`
            );
            if (confirmation) {
                try {
                    await participantService.addStatus(this.data.id, {
                        present: true
                    });
                    // alert("Marked.");
                    await this.refresh();
                } catch (e) {
                    alert(e.response.data.message);
                }
            }
        },
        refresh: async function() {
            try {
                const d = await participantService.getInfo(this.data.id);
                this.participantData = d.data;
            } catch (e) {
                //
            }
        }
    },
    computed: {
        gender: function() {
            if (this.participantData.sex) {
                if (this.participantData.sex === 1) return "M";
                if (this.participantData.sex === 2) return "F";
            } else {
                return "";
            }
        },
        academicProgram: function() {
            if (this.participantData.academic_program) {
                return "ภาค" + this.participantData.academic_program?.name;
            }
            return;
        },
        contact: function() {
            return {
                phone: this.participantData.contact?.phone,
                line: this.participantData.contact?.line
            };
        },
        healthCondition: function() {
            if (this.participantData.health_profile) {
                const h = this.participantData.health_profile;
                if (
                    h.food_allergy ||
                    h.general_allergy ||
                    h.medical_history ||
                    h.medication ||
                    h.medication_allergy
                ) {
                    return true;
                }
            }
            return false;
        },
        isStatusDefined: function() {
            return !!this.participantData.statuses;
        },
        isMarked: function() {
            if (
                this.participantData.statuses &&
                this.participantData.statuses.length > 0
            ) {
                return true;
            }
        },
        isPresent: function() {
            if (this.participantData.statuses.length > 0) {
                return this.participantData.statuses[
                    this.participantData.statuses.length - 1
                ].present;
            } else {
                return false;
            }
        }
    }
};
</script>
