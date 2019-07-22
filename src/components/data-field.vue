<template>
    <div
        class="w-full flex justify-between items-baseline text-sm border-t pt-4"
        :class="{ 'pb-4': !last, 'flex-row': !showFullText && !isEditing, 'flex-col': showFullText || isEditing }"
    >
        <p
            v-if="label"
            class="text-xs text-gray-4 tracking-wide mr-8 flex-shrink-0"
            :class="{ 'mb-2': showFullText || isEditing }"
        >{{label}}</p>
        <span
            v-if="!showFullText && !isEditing && !image"
            class="truncate"
            @click="showContent($event.target)"
        >{{displayValue}}</span>
        <span v-if="showFullText && !isEditing && !image">{{displayValue}}</span>
        <a
            v-if="image"
            :href="`https://api.vishnu17.com${image}`"
            target="_blank"
            class="text-blue-2"
        >View Image</a>
        <InputField v-if="isEditing" v-model="localValue" :placeholder="label" />
    </div>
</template>

<script>
import InputField from "@/components/input-field";
export default {
    props: ["label", "value", "last", "isEditing", "image"],
    components: {
        InputField
    },
    data: function() {
        return {
            showFullText: false
        };
    },
    methods: {
        isEllipsisActive: function(e) {
            return e.offsetWidth < e.scrollWidth;
        },
        showContent: function(e) {
            if (this.isEllipsisActive(e)) {
                this.showFullText = true;
            }
        }
    },
    computed: {
        displayValue: function() {
            if (!this.value || this.value === "" || this.value === null) {
                return "N/A";
            } else {
                return this.value;
            }
        },
        localValue: {
            get() {
                return this.value;
            },
            set(localValue) {
                this.$emit("input", localValue);
            }
        }
    },
    watch: {
        value: function(v) {
            this.$emit("input", v);
        }
    }
};
</script>
