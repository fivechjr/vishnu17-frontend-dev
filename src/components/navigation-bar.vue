<template>
    <header
        v-if="$store.state.currentUser.isAuthenticated"
        class="bg-white sticky top-0 z-20 flex items-center"
        style="box-shadow: 0 25px 50px -12px rgba(0,0,0,.075)"
    >
        <div class="container">
            <div class="w-full flex justify-center">
                <div
                    class="w-full flex flex-row items-center px-8 overflow-x-auto"
                    style="height: 70px"
                >
                    <div class="flex items-center" style="min-width: calc(722.2px + 2rem)">
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
                            class="text-xs tracking-wide uppercase text-gray-4 mr-8"
                            :to="{ name: 'Statuses' }"
                            tag="a"
                        >Statuses</router-link>
                        <a
                            class="text-sm tracking-wide uppercase text-gray-4"
                            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vT3DN7ccZTO0e0jGn0O5LlMihwjI_8DzzSwyu7IvFJxWookSiBIJc-HmGDOUFnAwHuaF1JxPLIgTSOa/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
                            target="_blank"
                        >ตารางการใช้วิทยุสื่อสาร</a>
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
    color: #000;
    @apply font-medium;
}
</style>
