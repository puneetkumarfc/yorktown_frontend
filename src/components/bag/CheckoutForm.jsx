import { useState } from 'react';
import { PaymentElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error('Error: ', error);
    } else {
      console.log('PaymentMethod: ', paymentMethod);
      // Send paymentMethod.id to your backend to process the payment
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element"/>
      <button type="submit" disabled={!stripe || loading} className='py-2 border rounded-xl w-full hover:bg-white hover:text-black transition-all duration-150'>
        {loading ? 'Processing…' : 'Pay'}
      </button>
    </form>
  );
};

export default CheckoutForm;