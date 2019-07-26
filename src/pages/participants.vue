<template>
    <Layout>
        <Aside
            v-show="showAside"
            @applySorting="applySorting"
            @applyFiltering="applyFiltering"
            @close="showAside = false"
        />
        <div class="flex flex-row justify-end mb-12">
            <Button size="small" variant="secondary" @click.native="showAside = !showAside">Sorting</Button>
        </div>
        <p class="text-xs uppercase tracking-wide text-blue-2">{{pagination.records}} RECORDS</p>
        <div class="flex flex-row mb-12" />
        <section v-if="participants && participants.length > 0" class="w-full overflow-x-scroll">
            <ListHeader />
            <ListItem
                v-for="(p, i) in participants"
                :index="(i + 1 + (pagination.perPage * (pagination.current - 1)))"
                :data="p"
                :key="p.id"
            />
        </section>
        <div v-if="participants && participants.length > 0" class="flex flex-row mb-12" />
        <div v-if="participants && participants.length > 0" class="w-full flex justify-end">
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
import Aside from "@/components/participants/aside";
import InputField from "@/components/input-field";
import ListHeader from "@/components/participants/list-header";
import ListItem from "@/components/participants/list-item";
import Button from "@/components/button";
import * as participantService from "@/services/participant-service";
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
                total: 0,
                perPage: 0,
                records: 0
            },
            sorting: {
                first_name: "",
                year: "",
                student_id: ""
            },
            showAside: false,
            filters: {}
        };
    },
    async created() {
        try {
            await this.fetchParticipants();
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        fetchParticipants: async function(p = {}) {
            const query = this.createQuery(p);
            const all = await participantService.getAll(query);
            const data = all.data.data;
            this.participants = data;
            this.pagination = {
                current: all.data.current_page,
                total: all.data.last_page,
                perPage: all.data.per_page,
                records: all.data.total
            };
        },
        handlePageChange: async function(page) {
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page,
                ...this.filters
            };
            await this.fetchParticipants(params);
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
            await this.fetchParticipants(params);
        },
        applyFiltering: async function(f) {
            this.filters = f;
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page: 1,
                ...this.filters
            };
            await this.fetchParticipants(params);
        }
    }
};
</script>
