import React from 'react'
import CheckoutForm from './CheckoutForm'

const PaymentDetails = () => {
  return (
    <>
      <p className='mb-2 text-xl font-poppins font-bold uppercase text-center'>Complete your payment</p>
      <p className='text-sm text-white/50 text-center mb-7'>Fill in your payment details to securely process your payments</p>

      <CheckoutForm />
    </>
  )
}

export default PaymentDetails