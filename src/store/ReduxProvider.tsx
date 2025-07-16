'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ModtifLoader from '@/components/loader/ModtifLoader'
import { persistor, store } from '.'

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<ModtifLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
