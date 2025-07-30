import React from "react";
import CheckoutForm from "./CheckoutForm";

const PaymentDetails = ({ orderId, setCheckoutModal }) => {
  return (
    <>
      <p className="mb-2 text-xl font-poppins font-bold uppercase text-center">
        Complete your payment
      </p>
      <p className="text-sm text-black/50 text-center mb-7">
        Fill in your payment details to securely process your payments
      </p>

      <CheckoutForm orderId={orderId} setCheckoutModal={setCheckoutModal}/>
    </>
  );
};

export default PaymentDetails;
