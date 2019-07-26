<template>
    <main>
        <section class="flex flex-col justify-center items-center mx-8 my-12">
            <div class="section w-full flex flex-col">
                <p class="text-3xl font-bold text-center">Vishnu 17</p>
                <Spacer />
                <InputField placeholder="Username" v-model="form.username" type="text" />
                <Spacer />
                <InputField placeholder="Password" v-model="form.password" type="password" />
                <Spacer />
                <Button type="submit" @click.native="go">Continue</Button>
            </div>
        </section>
    </main>
</template>

<style scoped>
section {
    min-height: calc(100vh - 96px);
    min-height: -webkit-calc(100vh - 96px);
}

.section {
    max-width: 240px;
}
</style>


<script>
import Layout from "@/components/layout";
import Module from "@/components/module";
import InputField from "@/components/input-field";
import Button from "@/components/button";
import Spacer from "@/components/spacer";
import { setAuthorization } from "@/utils/http-request";
import * as authService from "@/services/auth-service";
export default {
    components: {
        Layout,
        Module,
        InputField,
        Button,
        Spacer
    },
    data: function() {
        return {
            form: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        go: async function() {
            try {
                const signIn = await authService.signIn(this.form);
                if (signIn.data) {
                    setAuthorization(signIn.data.access_token);
                    await this.$store.dispatch("setCurrentUser");
                    this.$router.replace({ name: "All Participants" });
                }
            } catch (e) {
                //
            }
        }
    }
};
</script>
