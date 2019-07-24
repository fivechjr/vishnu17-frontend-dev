<template>
    <Module>
        <template slot="content">
            <div class="px-8 py-6">
                <p class="text-xl font-medium">Statuses</p>
                <Spacer />
                <div v-if="data && data.length > 0">
                    <DataField
                        v-for="(d, index) in data"
                        :key="d.id"
                        :label="d.updated_at"
                        :value="getName(d)"
                        :last="index === data.length - 1"
                    />
                </div>
                <NotFound v-else />
            </div>
        </template>
        <template slot="footer">
            <div class="w-full px-8 py-4">
                <div class="flex justify-between items-center">
                    <p>
                        <strong class="font-medium">{{data ? data.length : '0'}}</strong> Statuses
                    </p>
                    <div
                        v-if="$store.getters.hasPermission({ key: $route.params.id, name: 'people.contact.update' })"
                        class="flex ml-8 flex-shrink-0"
                    >
                        <Button
                            size="small"
                            @click.native="$router.push({
                                    name: 'Add Status',
                                    params: { id }
                                })"
                        >Add</Button>
                    </div>
                </div>
            </div>
        </template>
    </Module>
</template>

<script>
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import DataField from "@/components/data-field";
import Button from "@/components/button";
import NotFound from "@/components/not-found";
export default {
    props: ["id", "data"],
    components: {
        Module,
        Spacer,
        DataField,
        Button,
        NotFound
    },
    methods: {
        getName: function(status) {
            if (status.unexpected) {
                if (status.reason) {
                    return "Unexpected · " + status.reason;
                } else {
                    return "Unexpected";
                }
            }

            if (status.present) {
                return "Present";
            } else {
                return "Absent";
            }
        }
    }
};
</script>
