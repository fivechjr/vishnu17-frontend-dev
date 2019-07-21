<template>
    <div class="font-sans antialiased text-black leading-relaxed">
        <NavigationBar />
        <router-view :key="$route.fullPath" />
        <Footer />
    </div>
</template>

<style lang="less">
</style>

<script>
import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";
export default {
    components: {
        NavigationBar,
        Footer
    }
};
</script>
