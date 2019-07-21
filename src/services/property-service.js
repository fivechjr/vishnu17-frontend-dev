import { composeRequest, httpRequest } from '@/utils/http-request'

const addProperty = data => {
    return httpRequest({
        url: composeRequest(`/lost-and-found/properties`),
        method: 'POST',
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
}

const getInfo = id => {
    return httpRequest({
        url: composeRequest(`/lost-and-found/properties/${id}`),
        method: 'GET'
    })
}

const getActions = () => {
    return httpRequest({
        url: composeRequest('/lost-and-found/actions'),
        method: 'GET'
    })
}

const updateStatus = (id, data) => {
    return httpRequest({
        url: composeRequest(`/lost-and-found/properties/${id}/status`),
        method: 'PATCH',
        data
    })
}

const getAll = (query = '') => {
    return httpRequest({
        url: composeRequest(`/lost-and-found/properties?paginate=true&${query}`),
        method: 'GET'
    })
}

export { addProperty, getInfo, getActions, updateStatus, getAll }
