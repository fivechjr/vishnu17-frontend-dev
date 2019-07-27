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
        <p class="text-xs uppercase tracking-wide text-blue-2">{{pagination.records}} RECORDS</p>
        <div class="flex flex-row mb-12" />
        <Summary
            v-if="!parameters.method && meals.length > 0 && summary"
            :date="filters.date"
            :meal="filters.time"
            :summary="summary"
        />
        <div v-if="!parameters.method && meals.length > 0 && summary" class="flex flex-row mb-12" />
        <section v-if="meals && meals.length > 0" class="w-full overflow-x-scroll">
            <ListHeader />
            <ListItem
                v-for="(p, i) in meals"
                :index="(i + 1 + (pagination.perPage * (pagination.current - 1)))"
                :data="p"
                :key="p.id"
            />
        </section>
        <div v-if="meals && meals.length > 0" class="flex flex-row mb-12" />
        <div v-if="meals && meals.length > 0" class="w-full flex justify-end">
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
import NProgress from "nprogress";
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
import Summary from "@/components/meal-options/summary";
export default {
    components: {
        Layout,
        Aside,
        InputField,
        ListHeader,
        ListItem,
        Button,
        Paginate,
        NotFound,
        Summary
    },
    data: function() {
        return {
            meals: [],
            pagination: {
                current: 0,
                total: 0,
                records: 0,
                perPage: 0
            },
            sorting: {},
            filters: {},
            parameters: {
                method: "",
                extra: ""
            },
            showAside: false,
            summary: null
        };
    },
    async created() {
        await this.fetchMeals({}, false);
    },
    methods: {
        fetchMeals: async function(p = {}, useAlert = true) {
            NProgress.start();
            const query = this.createQuery(p);
            try {
                const all = await mealService.getAll(
                    this.parameters.method,
                    query,
                    this.parameters.extra
                );
                const summary = this.parameters.method ? null : all[1].data;
                const z = this.parameters.method ? all : all[0];
                const meals = z.data.data;
                this.meals = meals;
                this.summary = summary;
                this.pagination = {
                    current: z.data.current_page,
                    total: z.data.last_page,
                    records: z.data.total,
                    perPage: z.data.per_page
                };
            } catch (e) {
                if (useAlert) {
                    alert(e.response.data.message);
                }
            }
            NProgress.done();
        },
        handlePageChange: async function(page) {
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page,
                ...this.filters
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
                ...this.filters
            };
            await this.fetchMeals(params);
        },
        applyFiltering: async function(f) {
            this.filters = f;
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page: 1,
                ...this.filters
            };
            await this.fetchMeals(params);
        },
        applyParametering: async function(p) {
            this.parameters = p;
        }
    }
};
</script>
