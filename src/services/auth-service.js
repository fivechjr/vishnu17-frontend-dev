import { composeRequest, httpRequest } from '@/utils/http-request'

const signIn = credentials => {
    return httpRequest({
        url: composeRequest('/auth/login'),
        method: 'POST',
        data: credentials
    })
}

const me = () => {
    return httpRequest({
        url: composeRequest('/auth/me'),
        method: 'POST'
    })
}

const signOut = () => {
    return httpRequest({
        url: composeRequest('/auth/logout'),
        method: 'POST'
    })
}

const refresh = () => {
    return httpRequest({
        url: composeRequest('/auth/refresh'),
        method: 'POST'
    })
}

export { signIn, me, signOut, refresh }
