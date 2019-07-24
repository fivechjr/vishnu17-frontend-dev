import { composeRequest, httpRequest } from '@/utils/http-request'

const getHouses = () => {
    return httpRequest({
        url: composeRequest('/baans'),
        method: 'GET'
    })
}

const getDivisions = () => {
    return httpRequest({
        url: composeRequest('/divisions'),
        method: 'GET'
    })
}

export { getHouses, getDivisions }
