import React from 'react'
import useStore from '@/hooks/useStore'
import { useObserver } from 'mobx-react-lite'

const Navigation = ({ store }) => {
    const { timerStore } = useStore()
    return useObserver(() => <p onClick={() => timerStore.tick()}>{timerStore.elapsedTime}</p>)
}

export default Navigation
