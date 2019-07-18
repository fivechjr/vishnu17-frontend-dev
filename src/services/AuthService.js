import { composeURL, sendRequest, setAuthorization } from '@/utils/Request'

const signIn = credentials =>
    sendRequest({ url: composeURL('/auth/login'), method: 'POST', data: credentials })

const me = () => sendRequest({ url: composeURL('/auth/me'), method: 'POST' })

const signOut = () => sendRequest({ url: composeURL('/auth/logout'), method: 'POST' })

const refresh = async () => {
    try {
        const request = await sendRequest({ url: composeURL('/auth/refresh'), method: 'POST' })
        if (request.data) {
            setAuthorization(request.data.access_token)
            return Promise.resolve()
        }
    } catch (e) {
        //
    } finally {
        return Promise.reject()
    }
}

export { signIn, me, signOut, refresh }
