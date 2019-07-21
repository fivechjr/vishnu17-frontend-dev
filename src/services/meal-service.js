import { composeRequest, httpRequest } from '@/utils/http-request'

const getAll = (method = null, query = '', extra = null) => {
    switch (method) {
        default:
            return httpRequest({
                url: composeRequest(`/meal-options?paginate=true&${query}`),
                method: 'GET'
            })
        case 'year':
            return httpRequest({
                url: composeRequest(`/meal-options/year/${extra}?paginate=true&${query}`),
                method: 'GET'
            })
        case 'house':
            return httpRequest({
                url: composeRequest(`/meal-options/baan/${extra}?paginate=true&${query}`),
                method: 'GET'
            })
    }
}

export { getAll }
