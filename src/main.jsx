import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Rgn47FRY99NMsGPiUl2J7v4TBq5avectsvAtc6Ekl7vqsT6PwHYlE7Y1h5vzADSD0HLvqN9UYO4niw5XU06RyGm00bi7d8I8P');

//todo: create a checkout session
const fetchClientSecret = async() => {

}

const options = {
  clientSecret: 'pi_12345ABCDEF_secret_your_secret_here', //todo: change later on
  appearance: {
    theme: 'stripe',
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <BrowserRouter>
      <Elements stripe={stripePromise} options={options}>
        <App />
      </Elements>
    </BrowserRouter>
  </StrictMode>
)
