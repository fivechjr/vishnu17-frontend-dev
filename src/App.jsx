import React, { useEffect, Suspense, Fragment, lazy } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AuthedRoute from '@/components/AuthedRoute'
import Store from '@/utils/Store'

const Authed = lazy(() => import('@/pages/Authed'))
const Test = lazy(() => import('@/pages/Test'))

function App() {
    const timerStore = new Store()
    return (
        <Suspense fallback={<Fragment />}>
            <Router>
                <Route store={timerStore} path="/test" component={Test} />
                <AuthedRoute store={timerStore} path="/authed" component={Authed} />
            </Router>
        </Suspense>
    )
}

export default App
