import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import useProviderContext from '@/utils/use-provider-context'
import * as authService from '@/services/auth-service'

const AuthedRoute = ({ component: Component, store, ...rest }) => {
    const [isRequested, setRequested] = useState(false)
    const { timer } = useProviderContext()

    useEffect(() => {
        ;(async function() {
            try {
                timer.test()
                await authService.me()
            } catch (e) {
                //
            } finally {
                setRequested(true)
            }
        })()
    }, [store, timer])

    if (!isRequested) {
        return null
    } else {
        return <Route {...rest} render={props => <Component store={store} {...props} />} />
    }
}

export default AuthedRoute
