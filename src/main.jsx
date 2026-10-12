import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { store } from '@/store/store'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
        <Toaster
          richColors
          position="top-right"
          closeButton
          theme="system"
        />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
)
