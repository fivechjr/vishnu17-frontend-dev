<template>
    <header
        v-if="$store.state.currentUser.isAuthenticated"
        class="bg-white sticky top-0 bg-gray-1 z-20 flex items-center"
        style="height: 60px"
    >
        <div class="container">
            <div class="w-full flex justify-center">
                <div class="w-full flex flex-col px-8">
                    <div class="w-full flex items-center">
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
                            class="text-xs tracking-wide uppercase text-gray-4"
                            :to="{ name: 'Meal Options' }"
                            tag="a"
                        >Meal Options</router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    components: {}
};
</script>

<style>
.router-link-exact-active {
    @apply text-black;
}
</style>
