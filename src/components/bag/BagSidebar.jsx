import React, { useState } from "react";
import UserDetails from "./UserDetails";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";
import useCartStore from "../../hooks/useCartStore";
import { placeOrder } from "../../services/operations/payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { RxCross2 } from "react-icons/rx";
import { useLoader } from "../common/LoaderContext";
import toast from "react-hot-toast";

const BagSidebar = ({ setCheckoutModal, orderId, setOrderId }) => {
  // const stripePromise = loadStripe(
  //   "pk_test_51Rgn47FRY99NMsGPiUl2J7v4TBq5avectsvAtc6Ekl7vqsT6PwHYlE7Y1h5vzADSD0HLvqN9UYO4niw5XU06RyGm00bi7d8I8P"
  // );

  const stripePromise = loadStripe(
    "pk_live_51Rgn3vFRe9zYMh4jxu5p0T9DZRU4PwWVBiS8ZlXeekaQ5hpM7sGAs0MCDmndWGxbIAP740mJrO36KosKjHR4LnVK00YRIh4F8T"
  );

  const { cart, totalPrice } = useCartStore();
  const { showLoader, hideLoader } = useLoader();

  const cartItems = cart.map((item) => ({
    itemId: item.id,
    sizeId: item.size,
    quantity: item.quantity,
    toppingIds: item.toppings,
    cheeseIds: item.cheese,
    bread: item.bread,
    notes: item.notes,
  }));

  const [formStep, setFormStep] = useState(1);

  const [formData, setFormData] = useState({
    userDetails: {},
    deliveryDetails: {},
  });

  const [options, setOptions] = useState(null);

  const handleNext = async (data) => {
    if (formStep === 1) {
      setFormData((prev) => ({ ...prev, userDetails: data }));
    } else if (formStep === 2) {
      setFormData((prev) => ({ ...prev, deliveryDetails: data }));

      const input = {
        ...formData.userDetails,
        ...data,
        orderType: "takeaway",
        cart: cartItems,
        stripePayment: {
          amount: Number(totalPrice()),
          currency: "usd",
          metadata: {
            orderId: orderId,
            notes: "Takeaway order",
          },
        },
      };
      showLoader();
      try {
        const response = await placeOrder(input);
        console.log("Order placed:", response.data.data.clientSecret);
        if (response.data.status) {
          setOptions({
            clientSecret: response.data.data.clientSecret,
            appearance: {
              theme: "stripe",
            },
          });
          setOrderId(response.data.data.orderId);
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setCheckoutModal(false);
        toast.error("Something went wrong! Please try again after some time.");
      } finally {
        hideLoader();
      }
    }

    setFormStep(formStep + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-full max-w-[400px] xl:w-[400px] bg-customBeige rounded-2xl shadow-2xl overflow-y-auto p-0 m-4 max-h-[80vh]">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 text-sm text-black hover:text-customOrange transition-colors bg-mainBg/70 rounded-full p-1 shadow focus:outline-none"
          aria-label="Close checkout modal"
          onClick={() => setCheckoutModal(false)}
        >
          <RxCross2 />
        </button>

        <div className="flex flex-col p-8 mt-4">
          <div className="flex items-center w-full mb-8">
            <p
              className={`${
                formStep === 1 ? "text-2xl" : "text-sm"
              } cursor-pointer`}
            >
              01
            </p>
            <div className="w-full min-h-[0.2px] bg-black/70 mx-4"></div>
            <p
              className={`${
                formStep === 2 ? "text-2xl" : "text-sm"
              } cursor-pointer`}
            >
              02
            </p>
            <div className="w-full min-h-[0.2px] bg-black/70 mx-4"></div>
            <p
              className={`${
                formStep === 3 ? "text-2xl" : "text-sm"
              } cursor-pointer`}
            >
              03
            </p>
          </div>

          {formStep === 1 ? (
            <UserDetails
              setFormStep={setFormStep}
              formStep={formStep}
              handleNext={handleNext}
            />
          ) : formStep === 2 ? (
            <AddressDetails
              setFormStep={setFormStep}
              formStep={formStep}
              handleNext={handleNext}
            />
          ) : options ? (
            <Elements stripe={stripePromise} options={options}>
              <PaymentDetails
                setFormStep={setFormStep}
                formStep={formStep}
                handleNext={handleNext}
                orderId={orderId}
                setCheckoutModal={setCheckoutModal}
              />
            </Elements>
          ) : (
            <p>Loading payment details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BagSidebar;
