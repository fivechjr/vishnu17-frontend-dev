import React from 'react'
import useStore from '@/hooks/useStore'
import { useObserver } from 'mobx-react-lite'

const Authed = ({ store }) => {
    const { timerStore } = useStore()
    return useObserver(() => (
        <p onClick={() => timerStore.tick()}>
            {timerStore.debug} - {timerStore.elapsedTime}
            <span>Test!</span>
        </p>
    ))
}

export default Authed
