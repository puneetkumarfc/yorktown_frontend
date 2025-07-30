import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const CheckoutForm = ({ orderId, setCheckoutModal}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `https://eatatyorktown.com/bag?order_id=${orderId}`,
      },
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
      setCheckoutModal(false);
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 py-2 font-roboto font-semibold cursor-pointer rounded-xl w-full bg-black/90 hover:bg-mainBg text-white hover:text-black transition-all duration-150"
      >
        {loading ? "Processing…" : "Pay"}
      </button>
    </form>
  );
};

export default CheckoutForm;
