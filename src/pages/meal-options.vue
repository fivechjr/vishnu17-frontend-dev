<template>
    <Layout>
        <Aside
            v-show="showAside"
            @applySorting="applySorting"
            @applyFiltering="applyFiltering"
            @applyParametering="applyParametering"
            @close="showAside = false"
        />
        <div class="flex flex-row justify-end mb-12">
            <Button size="small" @click.native="showAside = !showAside">Filtering & Sorting</Button>
        </div>
        <section
            v-if="participants && participants.length > 0"
            class="w-full overflow-x-scroll"
            style="min-width: 768px"
        >
            <ListHeader />
            <ListItem v-for="p in participants" :data="p" :key="p.id" />
            <div class="flex flex-row mb-12" />
            <div class="w-full flex justify-end">
                <Paginate
                    v-model="pagination.current"
                    :page-count="pagination.total"
                    :click-handler="handlePageChange"
                    :prev-text="'PREV'"
                    :next-text="'NEXT'"
                    :break-view-text="'·'"
                    :container-class="'text-sm flex flex-row items-baseline text-gray-4'"
                    :page-class="'mx-4'"
                    :break-view-class="'mx-4'"
                    :prev-class="'text-xs tracking-wide mr-4'"
                    :next-class="'text-xs tracking-wide ml-4'"
                    :active-class="'text-black'"
                ></Paginate>
            </div>
        </section>
        <NotFound v-else />
    </Layout>
</template>

<script>
import _ from "lodash";
import Layout from "@/components/layout";
import Aside from "@/components/meal-options/aside";
import InputField from "@/components/input-field";
import ListHeader from "@/components/meal-options/list-header";
import ListItem from "@/components/meal-options/list-item";
import Button from "@/components/button";
import * as mealService from "@/services/meal-service";
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
            participants: [],
            pagination: {
                current: 0,
                total: 0
            },
            sorting: {},
            filters: {
                date: "",
                time: ""
            },
            parameters: {
                method: "",
                extra: ""
            },
            showAside: false
        };
    },
    async created() {
        await this.fetchMeals({}, false);
    },
    methods: {
        fetchMeals: async function(p = {}, useAlert = true) {
            const query = this.createQuery(p);
            try {
                const all = await mealService.getAll(
                    this.parameters.method,
                    query,
                    this.parameters.extra
                );
                const data = all.data.data;
                this.participants = data;
                this.pagination = {
                    current: all.data.current_page,
                    total: all.data.last_page
                };
            } catch (e) {
                if (useAlert) {
                    alert(e.response.data.message);
                }
            }
        },
        handlePageChange: async function(page) {
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page,
                ...this.filter
            };
            await this.fetchMeals(params);
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
        createSortingQuery: function(params) {
            params = _.pickBy(params, _.identity);
            return Object.keys(params)
                .map(key => key + "+" + encodeURIComponent(params[key]))
                .join(",");
        },
        applySorting: async function(s) {
            this.sorting = s;
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page: this.pagination.current,
                ...this.filter
            };
            await this.fetchMeals(params);
        },
        applyFiltering: async function(f) {
            this.filter = f;
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page: this.pagination.current,
                ...this.filter
            };
            await this.fetchMeals(params);
        },
        applyParametering: async function(p) {
            this.parameters = p;
        }
    }
};
</script>
