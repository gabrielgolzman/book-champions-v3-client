import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ThemeContextProvider from './services/theme/ThemeContextProvider.jsx'
import AuthenticationContextProvider from './services/auth/AuthContextProvider.jsx'
import App from './App.jsx'

import './index.css'
import TranslateContextProvider from './services/translation/TranslationContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslateContextProvider>
      <ThemeContextProvider>
        <AuthenticationContextProvider>
          <App />
        </AuthenticationContextProvider>
      </ThemeContextProvider>
    </TranslateContextProvider>
  </StrictMode>,
)