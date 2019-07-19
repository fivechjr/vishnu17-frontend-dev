import React, { Suspense, Fragment, lazy } from 'react'
import { Provider } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AuthedRoute from '@/components/AuthedRoute'
import Navigation from '@/components/Navigation'

import Store from '@/stores'

const Authed = lazy(() => import('@/pages/Authed'))
const Test = lazy(() => import('@/pages/Test'))

function App() {
    const timerStore = new Store()
    return (
        <Provider {...new Store()}>
            <>
                <Navigation store={timerStore} />
                <Suspense fallback={<Fragment />}>
                    <Router>
                        <Route store={timerStore} path="/test" component={Test} />
                        <AuthedRoute store={timerStore} path="/authed" component={Authed} />
                    </Router>
                </Suspense>
            </>
        </Provider>
    )
}

export default App
