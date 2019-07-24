<template>
    <div class="w-full px-8 py-4">
        <div v-if="!value" class="flex justify-between items-center">
            <p v-if="editPermission">
                Last updated was on
                <strong class="font-medium">{{lastUpdated}}</strong>
            </p>
            <div class="flex ml-8 flex-shrink-0" v-if="editPermission">
                <Button size="small" @click.native="edit">Edit</Button>
            </div>
            <p v-else>You do not have enough permission to edit this resource.</p>
        </div>
        <div v-else class="flex justify-between items-center">
            <div class="flex flex-shrink-0">
                <Button size="small" variant="secondary" @click.native="cancel">Cancel</Button>
            </div>
            <div class="flex ml-8 flex-shrink-0">
                <Button size="small" @click.native="save">Save</Button>
            </div>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button";
export default {
    props: ["value", "lastUpdated", "editPermission"],
    components: {
        Button
    },
    methods: {
        edit: function() {
            this.$emit("input", true);
            this.$emit("edit");
        },
        cancel: function() {
            this.$emit("input", false);
            this.$emit("cancel");
        },
        save: function() {
            this.$emit("input", false);
            this.$emit("save");
        }
    }
};
</script>
