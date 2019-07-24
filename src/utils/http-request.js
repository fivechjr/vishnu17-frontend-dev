import * as axios from 'axios'
import * as authService from '@/services/auth-service'
import NProgress from 'nprogress'

const localStorageKey = 'vishnu17:refresh-token'
const getAuthorizationToken = () => window.localStorage.getItem(localStorageKey || '')
const setAuthorization = token => window.localStorage.setItem(localStorageKey, token)
const useAuthorization = () => 'Bearer ' + getAuthorizationToken()

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(token) {
    subscribers = subscribers.filter(callback => callback(token))
}

function addSubscriber(callback) {
    subscribers.push(callback)
}

const composeRequest = f => {
    return (
        (process.env.NODE_ENV === 'production'
            ? 'https://api.vishnu17.com'
            : 'http://localhost:8080') + f
    )
}

const httpRequest = axios.create()

httpRequest.interceptors.request.use(
    config => {
        // NProgress.start()
        config.headers['Authorization'] = useAuthorization()
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

httpRequest.interceptors.response.use(
    function(response) {
        // NProgress.done()
        return response
    },
    function(error) {
        // NProgress.done()
        if (error.response) {
            const {
                config,
                response: { status }
            } = error

            const originalRequest = config

            if (status === 401) {
                console.log('Seems to be 401')
                if (!isAlreadyFetchingAccessToken) {
                    isAlreadyFetchingAccessToken = true
                    authService
                        .refresh()
                        .then(response => {
                            isAlreadyFetchingAccessToken = false
                            setAuthorization(response.data.access_token)
                            onAccessTokenFetched(response.data.access_token)
                        })
                        .catch(e => {
                            isAlreadyFetchingAccessToken = false
                            setAuthorization('')
                            onAccessTokenFetched('')
                        })
                }

                const retryOriginalRequest = new Promise(resolve => {
                    addSubscriber(token => {
                        originalRequest.headers.Authorization = 'Bearer ' + token
                        resolve(axios(originalRequest))
                    })
                })

                return retryOriginalRequest
            }
        }

        return Promise.reject(error)
    }
)

export { setAuthorization, useAuthorization, httpRequest, composeRequest, getAuthorizationToken }
