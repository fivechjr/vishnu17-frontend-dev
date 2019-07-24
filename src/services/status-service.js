import { composeRequest, httpRequest } from '@/utils/http-request'

const getAll = (method = null, extra = null) => {
    switch (method) {
        default:
            return httpRequest({
                url: composeRequest(`/statuses?paginate=true`),
                method: 'GET'
            })
        case 'year':
            return httpRequest({
                url: composeRequest(`/statuses/year/${extra}?paginate=true`),
                method: 'GET'
            })
        case 'division':
            return httpRequest({
                url: composeRequest(`/statuses/division/${extra}?paginate=true`),
                method: 'GET'
            })
    }
}

export { getAll }
