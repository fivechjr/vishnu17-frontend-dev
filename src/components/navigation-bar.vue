<template>
    <header
        v-if="$store.state.currentUser.isAuthenticated"
        class="bg-gray-7 sticky top-0 z-20 flex items-center shadow-xl"
    >
        <div class="container">
            <div class="w-full flex justify-center">
                <div
                    class="w-full flex flex-row items-center px-8 overflow-x-auto"
                    style="height: 60px"
                >
                    <div class="flex items-center" style="min-width: calc(556.48px + 2rem)">
                        <a
                            class="text-xs tracking-wide uppercase text-gray-4 mr-8 cursor-pointer"
                            @click="quickSearch"
                        >Quick Search</a>
                        <router-link
                            class="text-xs tracking-wide uppercase text-gray-4 mr-8"
                            :to="{ name: 'All Participants' }"
                            tag="a"
                        >Participants</router-link>
                        <router-link
                            class="text-xs tracking-wide uppercase text-gray-4 mr-8"
                            :to="{ name: 'All Properties' }"
                            tag="a"
                        >Lost & Found</router-link>
                        <router-link
                            class="text-xs tracking-wide uppercase text-gray-4 mr-8"
                            :to="{ name: 'Meal Options' }"
                            tag="a"
                        >Meal Options</router-link>
                        <router-link
                            class="text-xs tracking-wide uppercase text-gray-4"
                            :to="{ name: 'Statuses' }"
                            tag="a"
                        >Statuses</router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    components: {},
    methods: {
        quickSearch: function() {
            let search = prompt("Student ID", "");
            if (search !== null) {
                this.$router.push({
                    name: "Profile",
                    params: { id: search }
                });
            }
        }
    }
};
</script>

<style>
.router-link-exact-active {
    @apply text-white;
    @apply font-medium;
}
</style>
