import * as gaxios from 'gaxios'

const sleep = ms => new Promise(r => setTimeout(r, ms))
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
                window.localStorage.setItem('z', Date.now())
                err.config.headers['Authorization'] = useAuthorization()
                console.log('going to sleep')
                await sleep(3000)
                console.log('wake up')
                resolve()
            })
        }
    },
    retry: true
}

const sendRequest = (options, callback) => gaxios.request(options, callback)

export { composeURL, sendRequest }
