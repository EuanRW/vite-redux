import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import './index.css'
import { handlers } from './api/mock'

import { setupServer } from 'msw/node'
export const apiServer = setupServer(...handlers)


async function enableMocking() {
  // const { setupWorker } = await import('msw/browser');
  // return setupWorker(...handlers).start()
}

enableMocking().then(() => {
  const container = document.getElementById('root')
  if (container) {
    const root = createRoot(container)

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    )
  }
})
