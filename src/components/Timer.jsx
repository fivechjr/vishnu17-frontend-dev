import React from 'react'
import { useObserver } from 'mobx-react-lite'

const Timer = ({ store }) =>
    useObserver(() => <p onClick={() => store.tick()}>{store.elapsedTime}</p>)

export default Timer
