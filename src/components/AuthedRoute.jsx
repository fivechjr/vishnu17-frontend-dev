import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import useStore from '@/hooks/useStore'
import * as authService from '@/services/AuthService'

const AuthedRoute = ({ component: Component, store, ...rest }) => {
    const [isRequested, setRequested] = useState(false)
    const { timerStore } = useStore()

    useEffect(() => {
        ;(async function() {
            try {
                timerStore.test()
                await authService.me()
            } catch (e) {
                //
            } finally {
                setRequested(true)
            }
        })()
    }, [store, timerStore])

    if (!isRequested) {
        return null
    } else {
        return <Route {...rest} render={props => <Component store={store} {...props} />} />
    }
}

export default AuthedRoute
