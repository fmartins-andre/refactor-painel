import ReactDOM from 'react-dom/client'

import './globals.css'

import { App } from './app'
import { DefaultAppProvider } from './services/providers/default-app-provider'

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <DefaultAppProvider>
      <App />
    </DefaultAppProvider>
  )
}
