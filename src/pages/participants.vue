<template>
    <Layout>
        <Aside v-show="showAside" @apply="applySorting" @close="showAside = false" />
        <div class="flex flex-row justify-end mb-12">
            <Button size="small" @click.native="showAside = !showAside">Sorting</Button>
        </div>
        <section v-if="participants && participants.length > 0">
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
import Aside from "@/components/participants/aside";
import InputField from "@/components/input-field";
import ListHeader from "@/components/participants/list-header";
import ListItem from "@/components/participants/list-item";
import Button from "@/components/button";
import * as participantService from "@/services/participant-service";
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
            participants: [],
            pagination: {
                current: 0,
                total: 0
            },
            sorting: {
                first_name: "",
                year: "",
                student_id: ""
            },
            showAside: false
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
                total: all.data.last_page
            };
        },
        handlePageChange: async function(page) {
            const params = {
                sort: this.createSortingQuery(this.sorting),
                page
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
                page: this.pagination.current
            };
            await this.fetchParticipants(params);
        }
    }
};
</script>
