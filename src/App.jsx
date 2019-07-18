import React, { useEffect } from 'react'
import Store from '@/utils/Store'
import Timer from '@/components/Timer'

import * as authService from '@/services/AuthService'

function App() {
    const timerStore = new Store()
    useEffect(() => {
        async function go() {
            try {
                await authService.me()
            } catch (e) {
                //
            }
        }
        go()
    })
    return (
        <main>
            <Timer store={timerStore} />
        </main>
    )
}

export default App
