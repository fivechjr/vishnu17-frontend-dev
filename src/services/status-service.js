import { composeRequest, httpRequest } from '@/utils/http-request'

const getAll = (method = null, query = '', extra = null) => {
    switch (method) {
        default:
            return httpRequest({
                url: composeRequest(`/statuses?paginate=true&${query}`),
                method: 'GET'
            })
        case 'house':
            return httpRequest({
                url: composeRequest(`/statuses/baan/${extra}?paginate=true&${query}`),
                method: 'GET'
            })
        case 'division':
            return httpRequest({
                url: composeRequest(`/statuses/division/${extra}?paginate=true&${query}`),
                method: 'GET'
            })
    }
}

export { getAll }
