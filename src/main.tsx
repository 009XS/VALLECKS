import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { logLoadTime } from './lib/performance'
import { logDeviceCapability } from './lib/deviceCapability'

// Initialize telemetry logging in development mode
logLoadTime();
logDeviceCapability();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
