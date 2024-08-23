import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Router>
    <ChakraProvider>
    <App />
    </ChakraProvider>
    </Router>
  </StrictMode>,
)
