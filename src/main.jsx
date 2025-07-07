import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {CheckoutProvider, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Rgn47FRY99NMsGPiUl2J7v4TBq5avectsvAtc6Ekl7vqsT6PwHYlE7Y1h5vzADSD0HLvqN9UYO4niw5XU06RyGm00bi7d8I8P');

//todo: create a checkout session
const fetchClientSecret = async() => {

}

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      {/* <CheckoutProvider stripe={stripePromise} options={{fetchClientSecret}}> */}
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      {/* </CheckoutProvider> */}
    </BrowserRouter>
  </StrictMode>
)
