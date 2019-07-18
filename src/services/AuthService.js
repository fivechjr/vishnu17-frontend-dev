import { composeURL, sendRequest } from '@/utils/Request'

const me = () => sendRequest({ url: composeURL('/auth/me'), method: 'POST' })

export { me }
