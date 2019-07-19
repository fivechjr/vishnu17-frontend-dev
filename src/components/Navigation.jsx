import React from 'react'
import useProviderContext from '@/utils/use-provider-context'
import { useObserver } from 'mobx-react-lite'

const Navigation = ({ store }) => {
    const { timer } = useProviderContext()
    return useObserver(() => <p onClick={() => timer.tick()}>{timer.elapsedTime}</p>)
}

export default Navigation
