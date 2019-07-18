import React from 'react'
import Store from '@/utils/Store'
import Timer from '@/components/Timer'

function App() {
    const timerStore = new Store()
    return (
        <main>
            <Timer store={timerStore} />
        </main>
    )
}

export default App
