import Vue from 'vue'
import Vuex from 'vuex'
import * as authService from '@/services/auth-service'
import * as baseService from '@/services/base-service'
import * as propertyService from '@/services/property-service'
import { setAuthorization } from '@/utils/http-request'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: {
            name: '',
            username: '',
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
            ]
        }
    },
    mutations: {
        setCurrentUser(state, payload) {
            state.currentUser.name = payload.name
            state.currentUser.username = payload.username
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
        clearCurrentUser({ commit }) {
            setAuthorization('')
            commit('clearCurrentUser')
        },
        async prepareResources({ commit, state }) {
            try {
                if (
                    state.options.propertyActions.length === 0 ||
                    state.options.houses.length === 0
                ) {
                    const propertyActions = propertyService
                        .getActions()
                        .then(d => commit('setPropertyActions', d.data))
                    const houses = baseService.getHouses().then(d => commit('setHouses', d.data))
                    await Promise.all([propertyActions, houses])
                } else {
                    return Promise.resolve()
                }
            } catch (e) {
                return Promise.reject(e)
            }
        }
    },
    getters: {
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
                case 'statuses':
                    return state.options.statuses.present
                case 'sorting-directions':
                    return state.options.sortingDirections
                case 'years':
                    return state.options.years
            }
        }
    }
})
