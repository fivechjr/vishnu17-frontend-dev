import Vue from 'vue'
import Vuex from 'vuex'
import * as _ from 'lodash'
import * as authService from '@/services/auth-service'
import * as baseService from '@/services/base-service'
import * as propertyService from '@/services/property-service'
import { setAuthorization, getAuthorizationToken } from '@/utils/http-request'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: {
            primaryKey: '',
            id: '',
            name: '',
            username: '',
            permissions: [],
            isAuthenticated: false
        },
        options: {
            mealOptions: {
                meals: [
                    { name: 'อาหารเช้า', value: 'breakfast' },
                    { name: 'อาหารกลางวัน', value: 'lunch' },
                    { name: 'อาหารเย็น', value: 'dinner' }
                ],
                methods: [{ name: 'ตามชั้นปี', value: 'year' }, { name: 'ตามบ้าน', value: 'house' }]
            },
            propertyActions: [],
            houses: [],
            statuses: {
                present: [{ name: 'YES', value: 1 }, { name: 'NO', value: 0 }]
            },
            sortingDirections: [
                { name: 'Ascending', value: 'asc' },
                { name: 'Descending', value: 'desc' }
            ],
            years: [
                { name: 'ชั้นปีที่ 1', value: '1' },
                { name: 'ชั้นปีที่ 2', value: '2' },
                { name: 'ชั้นปีที่ 3', value: '3' },
                { name: 'ชั้นปีที่ 4', value: '4' },
                { name: 'นายช่าง', value: '9' }
            ],
            genders: [{ name: 'ชาย', value: '1' }, { name: 'หญิง', value: '2' }],
            divisions: []
        }
    },
    mutations: {
        setCurrentUser(state, payload) {
            state.currentUser.id = payload.person_id
            state.currentUser.name =
                `${payload.person?.first_name} ${payload.person?.last_name} (${
                    payload.person?.nickname
                })` || 'N/A'
            state.currentUser.username = payload.username
            state.currentUser.permissions = payload.all_permissions
            state.currentUser.isAuthenticated = true
        },
        clearCurrentUser(state) {
            state.currentUser.name = ''
            state.currentUser.username = ''
            state.currentUser.isAuthenticated = false
        },
        setPropertyActions(state, payload) {
            state.options.propertyActions = payload
        },
        setHouses(state, payload) {
            state.options.houses = payload
        },
        setDivisions(state, payload) {
            state.options.divisions = payload
        }
    },
    actions: {
        async setCurrentUser({ commit }) {
            try {
                const data = (await authService.me()).data
                commit('setCurrentUser', data)
            } catch (e) {
                commit('clearCurrentUser')
                return Promise.reject(e)
            }
        },
        signOut() {
            setAuthorization('')
        },
        clearCurrentUser({ commit }) {
            commit('clearCurrentUser')
        },
        async prepareResources({ commit, state }) {
            try {
                if (
                    state.options.propertyActions.length === 0 ||
                    state.options.houses.length === 0
                ) {
                    // prettier-ignore
                    const propertyActions = propertyService
                        .getActions()
                        .then(d => commit('setPropertyActions', d.data))

                    // prettier-ignore
                    const houses = baseService
                        .getHouses()
                        .then(d => commit('setHouses', d.data))

                    // prettier-ignore
                    const divisions = baseService
                        .getDivisions()
                        .then(d => commit('setDivisions', d.data))

                    await Promise.all([propertyActions, houses, divisions])
                } else {
                    return Promise.resolve()
                }
            } catch (e) {
                return Promise.reject(e)
            }
        }
    },
    getters: {
        isAuthenticated: state => {
            return !!(state.currentUser.isAuthenticated && getAuthorizationToken())
        },
        hasPermission: state => ({ key = null, name }) => {
            if (key == state.currentUser.username || key == state.currentUser.id) {
                return true
            }

            const find = _.find(state.currentUser.permissions, { name })
            if (find) return true
            return false
        },
        getOptions: state => action => {
            switch (action) {
                default:
                    return []
                case 'meal-options':
                    return state.options.mealOptions.meals
                case 'meal-options:methods':
                    return state.options.mealOptions.methods
                case 'property-actions':
                    const transform = state.options.propertyActions.map(({ name }) => ({
                        name: name,
                        value: name
                    }))
                    return transform
                case 'houses':
                    const houses = state.options.houses.map(({ id, name }) => ({
                        name: name,
                        value: id
                    }))
                    return houses
                case 'divisions':
                    const divisions = state.options.divisions.map(({ id, name }) => ({
                        name: name,
                        value: id
                    }))
                    return divisions
                case 'statuses':
                    return state.options.statuses.present
                case 'sorting-directions':
                    return state.options.sortingDirections
                case 'years':
                    return state.options.years
                case 'genders':
                    return state.options.genders
            }
        }
    }
})
