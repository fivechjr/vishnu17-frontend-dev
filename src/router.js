import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import * as authService from '@/services/auth-service'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
    routes: [
        {
            path: '/',
            name: 'Sign In',
            component: () => import('./pages/sign-in.vue'),
            meta: {
                redirectIfAuthenticated: true
            }
        },
        {
            path: '/participants',
            name: 'All Participants',
            component: () => import('./pages/participants.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/participants/:id/view',
            name: 'Profile',
            component: () => import('./pages/per-participant.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/participants/:id/bags/add',
            name: 'Add Bag',
            component: () => import('./pages/extras/add-bag.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/participants/:id/bags/:bag/edit',
            name: 'Edit Bag',
            component: () => import('./pages/extras/edit-bag.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/participants/:id/statuses/add',
            name: 'Add Status',
            component: () => import('./pages/extras/add-status.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/participants/:id/meals/add',
            name: 'Add Meal',
            component: () => import('./pages/extras/add-meal.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/properties',
            name: 'All Properties',
            component: () => import('./pages/properties.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/properties/:id/view',
            name: 'Property',
            component: () => import('./pages/per-property.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/properties/add',
            name: 'Add Property',
            component: () => import('./pages/extras/add-property.vue'),
            meta: {
                requiresAuthenticated: true
            }
        },
        {
            path: '/meal-options',
            name: 'Meal Options',
            component: () => import('./pages/meal-options.vue'),
            meta: {
                requiresAuthenticated: true
            }
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.redirectIfAuthenticated && !to.params.skip) {
        try {
            if (store.state.currentUser.isAuthenticated) {
                await store.dispatch('prepareResources')
                return next({
                    name: 'All Participants'
                })
            } else {
                await store.dispatch('setCurrentUser')
                await store.dispatch('prepareResources')
                return next({
                    name: 'All Participants'
                })
            }
        } catch (e) {
            return next()
        }
    }

    if (to.meta.requiresAuthenticated) {
        try {
            if (store.state.currentUser.isAuthenticated) {
                await store.dispatch('prepareResources')
                next()
            } else {
                await store.dispatch('setCurrentUser')
                await store.dispatch('prepareResources')
                next()
            }
        } catch (e) {
            next({
                name: 'Sign In',
                params: {
                    skip: true
                }
            })
        }
    } else {
        next()
    }
})

export default router
