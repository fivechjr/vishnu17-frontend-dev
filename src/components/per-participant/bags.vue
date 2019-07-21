<template>
    <section class="w-full">
        <Module>
            <template slot="content">
                <div class="px-8 py-6">
                    <p class="text-xl font-medium">Bags</p>
                    <Spacer />
                    <div v-if="data && data.length > 0">
                        <PerBagView
                            v-for="(d, index) in data"
                            :key="d.id"
                            :data="d"
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
                            <strong class="font-medium">{{data ? data.length : '0'}}</strong> Bags
                        </p>
                        <div class="flex ml-8 flex-shrink-0">
                            <Button
                                size="small"
                                @click.native="$router.push({
                                    name: 'Add Bag',
                                    params: { id }
                                })"
                            >Add</Button>
                        </div>
                    </div>
                </div>
            </template>
        </Module>
    </section>
</template>

<script>
import Module from "@/components/module";
import Spacer from "@/components/spacer";
import DataField from "@/components/data-field";
import Button from "@/components/button";
import NotFound from "@/components/not-found";
import PerBagView from "@/components/per-participant/per-bag-view";
export default {
    props: ["id", "data"],
    components: {
        Module,
        Spacer,
        DataField,
        Button,
        PerBagView,
        NotFound
    }
};
</script>
