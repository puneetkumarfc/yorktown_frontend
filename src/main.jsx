import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';


//todo: create a checkout session
const fetchClientSecret = async() => {

}

const options = {
  clientSecret: 'pi_3RjR5dFRY99NMsGP1AJL3OFh_secret_jWWfkxmCc9xOiEILQxFdRcFUQ', //todo: change later on
  appearance: {
    theme: 'stripe',
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </StrictMode>
)
