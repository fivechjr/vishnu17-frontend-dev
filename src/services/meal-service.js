import { composeRequest, httpRequest } from '@/utils/http-request'

const getAll = (method = null, query = '', extra = null) => {
    switch (method) {
        default:
            return Promise.all([
                httpRequest({
                    url: composeRequest(`/meal-options?paginate=true&${query}`),
                    method: 'GET'
                }),
                httpRequest({
                    url: composeRequest(`/meal-options/summary?${query}`),
                    method: 'GET'
                })
            ])
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
