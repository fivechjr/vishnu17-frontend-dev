import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import * as authService from '@/services/AuthService'

const PrivateRoute = ({ component: Component, store, ...rest }) => {
    const [isRequested, setRequested] = useState(false)
    useEffect(() => {
        ;(async function() {
            store.test()
            try {
                await authService.me()
            } catch (e) {
                //
            } finally {
                setRequested(true)
            }
        })()
    }, [store])
    if (!isRequested) {
        return null
    } else {
        return <Route {...rest} render={props => <Component store={store} {...props} />} />
    }
}

export default PrivateRoute
