<template>
    <div class="text-sm w-full flex flex-row items-center border-b" style="min-width: 768px">
        <div class="w-2/6 flex flex-col px-4 py-3">
            <router-link
                target="_blank"
                :to="{
                name: 'Profile',
                params: { id: data.id }
            }"
            >
                <span class="text-sm text-black truncate">{{data.first_name}} {{data.last_name}}</span>
            </router-link>
            <span
                class="text-sm text-gray-3 truncate"
            >ภาค{{academicProgram}} ชั้นปีที่ {{data.year}}</span>
        </div>
        <div class="w-2/6 flex flex-col px-4 py-3">
            <span class="text-sm text-blue-2 font-medium truncate">{{contact.phone || ''}}</span>
            <span class="text-sm text-gray-3 truncate">{{contact.line || ''}}</span>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <span class="text-sm text-gray-3">{{gender}}</span>
        </div>
        <div class="w-1/6 flex flex-col px-4 py-3">
            <div v-if="healthCondition" class="flex w-2 h-2 rounded-full bg-red-500"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data"],
    computed: {
        gender: function() {
            if (this.data.sex) {
                if (this.data.sex === 1) return "M";
                if (this.data.sex === 2) return "F";
            } else {
                return "";
            }
        },
        academicProgram: function() {
            return this.data.academic_program?.name;
        },
        contact: function() {
            return {
                phone: this.data.contact?.phone,
                line: this.data.contact?.line
            };
        },
        healthCondition: function() {
            if (this.data.health_profile) {
                const h = this.data.health_profile;
                if (
                    h.food_allergy === null &&
                    h.general_allergy === null &&
                    h.medical_history === null &&
                    h.medication === null &&
                    h.medication_allergy === null
                ) {
                    return false;
                }
            }
            return true;
        }
    }
};
</script>
