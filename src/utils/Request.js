import * as gaxios from 'gaxios'
import * as authService from '@/services/AuthService'

const sleep = ms => new Promise(r => setTimeout(r, ms))

const setAuthorization = z => window.localStorage.setItem('z', z)
const useAuthorization = () => window.localStorage.getItem('z') || ''

const composeURL = z => {
    return (
        (process.env.NODE_ENV === 'production'
            ? 'https://api.vishnu17.com'
            : 'http://localhost:3000') + z
    )
}

gaxios.instance.defaults = {
    headers: {
        Authorization: useAuthorization()
    },
    retryConfig: {
        retry: 3,
        httpMethodsToRetry: ['POST', 'GET', 'PUT', 'HEAD', 'OPTIONS', 'DELETE'],
        statusCodesToRetry: [[100, 199], [429, 429], [500, 599], [401, 401]],
        onRetryAttempt: err => {
            return new Promise(async (resolve, reject) => {
                try {
                    await authService.refresh()
                    err.config.headers['Authorization'] = useAuthorization()
                    resolve()
                } catch (e) {
                    reject()
                    // window.location.replace('http://www.w3schools.com')
                }
            })
        }
    },
    retry: true
}

const sendRequest = (options, callback) => gaxios.request(options, callback)

export { composeURL, sendRequest, setAuthorization }
