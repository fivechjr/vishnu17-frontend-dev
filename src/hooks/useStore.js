import React from 'react'
import { MobXProviderContext } from 'mobx-react'

export default function useStore() {
    return React.useContext(MobXProviderContext)
}
