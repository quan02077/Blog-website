import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className='bg-slate-200 h-screen flex flex-col overflow-hidden'>
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
