import { composeRequest, httpRequest } from '@/utils/http-request'

const getAll = (query = '') => {
    return httpRequest({
        url: composeRequest(`/people?paginate=true&${query}`),
        method: 'GET'
    })
}

const getInfo = id => {
    return httpRequest({
        url: composeRequest(`/people/${id}`),
        method: 'GET'
    })
}

const updateHealthProfile = (id, data) => {
    return httpRequest({
        url: composeRequest(`/people/${id}/health-profile`),
        method: 'PATCH',
        data
    })
}

const updateContactInformation = (id, data) => {
    return httpRequest({
        url: composeRequest(`/people/${id}/contact`),
        method: 'PATCH',
        data
    })
}

const addBag = (id, data) => {
    return httpRequest({
        url: composeRequest(`/people/${id}/bags`),
        method: 'POST',
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
}

const getBag = data => {
    return httpRequest({
        url: composeRequest(`/people/${data.id}/bags/${data.bag}`),
        method: 'GET'
    })
}

const updateBag = data => {
    // POST: PHP can't do "PATCH" with `multipart/form-data`
    return httpRequest({
        url: composeRequest(`/people/${data.id}/bags/${data.bag}`),
        method: 'POST',
        data: data.form,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
}

const deleteBag = data => {
    return httpRequest({
        url: composeRequest(`/people/${data.id}/bags/${data.bag}`),
        method: 'DELETE'
    })
}

const addStatus = (id, data) => {
    return httpRequest({
        url: composeRequest(`/people/${id}/statuses`),
        method: 'POST',
        data,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
}

const addMeal = (id, data) => {
    return httpRequest({
        url: composeRequest(`/people/${id}/meal-options`),
        method: 'POST',
        data
    })
}

export {
    getAll,
    getInfo,
    updateHealthProfile,
    updateContactInformation,
    addBag,
    getBag,
    updateBag,
    deleteBag,
    addStatus,
    addMeal
}
