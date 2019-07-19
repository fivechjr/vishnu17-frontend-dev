import React from 'react'
import { MobXProviderContext } from 'mobx-react'

export default function useProviderContext() {
    return React.useContext(MobXProviderContext)
}
