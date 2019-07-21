<template>
    <footer class="mb-12" v-if="$store.state.currentUser.isAuthenticated">
        <div class="container">
            <div class="w-full flex justify-center">
                <div class="w-full flex flex-col px-8">
                    <div class="w-full flex flex-col items-center">
                        <p class="w-full text-sm text-center">{{$store.state.currentUser.name}}</p>
                        <Spacer />
                        <span
                            class="text-xs uppercase text-red-500 font-medium cursor-pointer"
                            @click="signOut"
                        >SIGN OUT</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import Spacer from "@/components/spacer";
import * as authService from "@/services/auth-service";
export default {
    components: {
        Spacer
    },
    methods: {
        signOut: async function() {
            try {
                await authService.signOut();
            } catch (e) {
                //
            } finally {
                this.$store.dispatch("clearCurrentUser");
                this.$router.replace({
                    name: "Sign In",
                    params: {
                        skip: true
                    }
                });
            }
        }
    }
};
</script>
