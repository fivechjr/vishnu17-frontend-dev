import React from 'react'
import useProviderContext from '@/utils/use-provider-context'
import { useObserver } from 'mobx-react-lite'

const Authed = ({ store }) => {
    const { timer } = useProviderContext()
    return useObserver(() => (
        <p onClick={() => timer.tick()}>
            {timer.debug} - {timer.elapsedTime}
            <span>Test!</span>
        </p>
    ))
}

export default Authed
