import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'leaflet/dist/leaflet.css'
// New unified design system CSS (in proper order)
import './styles/variables.css'      // CSS custom properties & variables
import './styles/base.css'          // Global resets & typography
import './styles/components.css'    // Component styles (buttons, cards, badges, etc)
import './styles/layout.css'        // Layout utilities & responsive design
import { ThemeProvider } from './context/ThemeContext'

// Add Font Awesome for icons
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
