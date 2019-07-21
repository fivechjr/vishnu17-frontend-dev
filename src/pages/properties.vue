<template>
    <Layout>
        <div class="flex flex-row justify-end mb-12">
            <Button size="small" @click.native="$router.push({ name: 'Add Property' })">Add Property</Button>
        </div>
        <section v-if="properties && properties.length > 0">
            <ListHeader />
            <ListItem v-for="p in properties" :data="p" :key="p.id" />
            <div class="flex flex-row mb-12" />
            <div class="w-full flex justify-end">
                <Paginate
                    v-model="pagination.current"
                    :page-count="pagination.total"
                    :click-handler="handlePageChange"
                    :prev-text="'PREV'"
                    :next-text="'NEXT'"
                    :break-view-text="'· · ·'"
                    :container-class="'text-sm flex flex-row items-baseline text-gray-4'"
                    :page-class="'mx-4'"
                    :break-view-class="'mx-4'"
                    :prev-class="'text-xs tracking-wide mr-4'"
                    :next-class="'text-xs tracking-wide ml-4'"
                    :active-class="'text-black'"
                ></Paginate>
            </div>
        </section>
    </Layout>
</template>

<script>
import _ from "lodash";
import Layout from "@/components/layout";
import Aside from "@/components/properties/aside";
import InputField from "@/components/input-field";
import ListHeader from "@/components/properties/list-header";
import ListItem from "@/components/properties/list-item";
import Button from "@/components/button";
import * as propertyService from "@/services/property-service";
import Paginate from "vuejs-paginate";
export default {
    components: {
        Layout,
        Aside,
        InputField,
        ListHeader,
        ListItem,
        Button,
        Paginate
    },
    data: function() {
        return {
            properties: [],
            pagination: {
                current: 0,
                total: 0
            }
        };
    },
    async created() {
        try {
            await this.fetchProperties();
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        fetchProperties: async function(p = {}) {
            const query = this.createQuery(p);
            const all = await propertyService.getAll(query);
            const data = all.data.data;
            this.properties = data;
            this.pagination = {
                current: all.data.current_page,
                total: all.data.last_page
            };
        },
        handlePageChange: async function(page) {
            const params = {
                page
            };
            await this.fetchProperties(params);
        },
        serialize: function(obj) {
            return Object.keys(obj)
                .map(k => k + "=" + encodeURIComponent(obj[k]))
                .join("&");
        },
        createQuery: function(params) {
            params = _.pickBy(params, _.identity);
            return Object.keys(params)
                .map(key => key + "=" + encodeURIComponent(params[key]))
                .join("&");
        }
    }
};
</script>
