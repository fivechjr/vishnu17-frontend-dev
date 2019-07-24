<template>
    <Layout>
        <Aside v-show="showAside" @applyFiltering="applyFiltering" @close="showAside = false" />
        <div class="flex flex-row justify-end mb-12">
            <Button size="small" @click.native="showAside = !showAside">Filtering</Button>
        </div>
        <p class="text-xs uppercase tracking-wide text-blue-2">{{pagination.records}} RECORDS</p>
        <div class="flex flex-row mb-12" />
        <section v-if="statuses && statuses.length > 0" class="w-full overflow-x-scroll">
            <ListHeader />
            <ListItem v-for="s in statuses" :data="s" :key="s.id" />
        </section>
        <div v-if="statuses && statuses.length > 0" class="flex flex-row mb-12" />
        <div v-if="statuses && statuses.length > 0" class="w-full flex justify-end">
            <Paginate
                v-model="pagination.current"
                :page-count="pagination.total"
                :click-handler="handlePageChange"
                :prev-text="'PREV'"
                :next-text="'NEXT'"
                :break-view-text="'·'"
                :container-class="'text-sm flex flex-row items-baseline text-gray-4 select-none'"
                :page-class="'mx-4'"
                :break-view-class="'mx-4'"
                :prev-class="'text-xs tracking-wide mr-4'"
                :next-class="'text-xs tracking-wide ml-4'"
                :active-class="'text-black'"
            ></Paginate>
        </div>
        <NotFound v-else />
    </Layout>
</template>

<script>
import _ from "lodash";
import Layout from "@/components/layout";
import Aside from "@/components/statuses/aside";
import InputField from "@/components/input-field";
import ListHeader from "@/components/statuses/list-header";
import ListItem from "@/components/statuses/list-item";
import Button from "@/components/button";
import * as statusService from "@/services/status-service";
import Paginate from "vuejs-paginate";
import NotFound from "@/components/not-found";
export default {
    components: {
        Layout,
        Aside,
        InputField,
        ListHeader,
        ListItem,
        Button,
        Paginate,
        NotFound
    },
    data: function() {
        return {
            showAside: false,
            statuses: [],
            pagination: {
                current: 0,
                total: 0,
                records: 0
            },
            filters: {
                method: "",
                extra: ""
            }
        };
    },
    async created() {
        try {
            await this.fetchStatuses({}, false);
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        fetchStatuses: async function(p = {}, useAlert = true) {
            const query = this.createQuery(p);
            try {
                const all = await statusService.getAll(
                    this.filters.method,
                    query,
                    this.filters.extra
                );
                const data = this.filters.method ? all.data : all.data.data;
                this.statuses = data;
                this.pagination = {
                    current: all.data.current_page,
                    total: all.data.last_page,
                    records: this.filters.method
                        ? all.data.length
                        : all.data.total
                };
            } catch (e) {
                if (useAlert) {
                    alert(e.response.data.message);
                }
            }
        },
        handlePageChange: async function(page) {
            const params = {
                page
            };
            await this.fetchStatuses(params);
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
        },
        applyFiltering: async function(f) {
            this.filters = f;
            const params = {
                page: this.pagination.current
            };
            await this.fetchStatuses(params);
        }
    }
};
</script>
