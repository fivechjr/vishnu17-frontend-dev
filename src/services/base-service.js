import { composeRequest, httpRequest } from '@/utils/http-request'

const getHouses = () => {
    return httpRequest({
        url: composeRequest('/baans'),
        method: 'GET'
    })
}

export { getHouses }
