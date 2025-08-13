import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './design-system'
import { EditModeProvider } from './contexts/EditModeContext'
import './design-system/styles/index.css'
import './styles/global.css'

// Scroll to top on page load/refresh
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <ThemeProvider>
        <EditModeProvider>
          <App />
        </EditModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 