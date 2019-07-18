import React from 'react'
import { useObserver } from 'mobx-react-lite'

const Authed = ({ store }) => {
    return useObserver(() => (
        <p onClick={() => store.tick()}>
            {store.debug} - {store.elapsedTime}
        </p>
    ))
}

export default Authed
