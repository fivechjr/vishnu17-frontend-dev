<template>
    <div
        v-if="data"
        class="flex flex-row justify-between items-center border-t border-dashed rounded pt-4"
        :class="{ 'pb-4': !last }"
    >
        <div class="flex flex-row items-center">
            <a
                v-if="data.image"
                class="mr-8"
                :href="`https://api.vishnu17.com${data.image}`"
                target="_blank"
            >
                <img :src="`https://api.vishnu17.com/${data.image}`" />
            </a>
            <div class="flex flex-col mr-8">
                <p class="text-sm">{{data.description}}</p>
                <p class="text-sm text-gray-6">{{data.current_location}}</p>
            </div>
        </div>
        <Button
            size="small"
            variant="secondary"
            @click.native="$router.push({
                name: 'Edit Bag',
                params: { bag: data.id }
            })"
        >Edit</Button>
    </div>
</template>

<style scoped>
img {
    width: 50px;
    height: 50px;
    @apply rounded;
    @apply border;
}
</style>


<script>
import Button from "@/components/button";
export default {
    props: ["data", "last"],
    components: {
        Button
    }
};
</script>
