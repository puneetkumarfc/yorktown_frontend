import React from "react";
import useCartStore from "../../hooks/useCartStore";
import { FiCode } from "react-icons/fi";
import { useState } from "react";
import { applyPromoCode } from "../../services/operations/menu";
import { useLoader } from "../common/LoaderContext";
import PizzaLoader from "../common/PizzaLoader";

const OrderSummary = ({ setCheckoutModal, showLoader, hideLoader }) => {
  const { cart, totalPrice } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  function calculateStripeAdjustedAmount(desiredAmount) {
    const stripePercentage = 0.029; // 2.9%
    const stripeFixedFee = 0.3; // $0.30 flat fee

    const adjustedTotal =
      (desiredAmount + stripeFixedFee) / (1 - stripePercentage);
    return parseFloat(adjustedTotal.toFixed(2));
  }

  // Example usage:
  const desiredAmount = 100; // you want to receive $100
  const chargeCustomer = calculateStripeAdjustedAmount(desiredAmount);

  const subtotal = Number(totalPrice());
  const discount = promoDiscount > 0 ? promoDiscount : 0;
  const taxableAmount = subtotal - discount;
  const tax = parseFloat((taxableAmount * 0.06).toFixed(2));
  const platformFee = parseFloat(((taxableAmount + tax) * 0.029 + 0.3).toFixed(2));
  const total = parseFloat((taxableAmount + tax + platformFee).toFixed(2));

  //promocode
  //tax (6%)

  //fxn value

  // Demo promo code logic
  const handleApplyPromo = async (promoCode) => {
    showLoader();
    try {
      const input = {
        orderAmount: totalPrice(),
        couponName: promoCode,
      };
      const response = await applyPromoCode(input);
      console.log(response);
      if (response.data.status) {
        setAppliedPromo(promoCode);
        setPromoDiscount(response.data.data);
      } else {
        setPromoError(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <div className="md:w-[360px] w-full flex lg:fixed right-0">
      <div className="w-full md:max-w-xs">
        <div className="bg-mainBg backdrop-blur-xl border border-black/10 rounded-2xl shadow-xl p-7 flex flex-col gap-5">
          <h3 className="text-xl font-bold text-customOrange mb-2">
            Order Summary
          </h3>
          {/* Promo code input - moved above subtotal */}
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border border-customBeige rounded-lg px-3 py-2 text-sm focus:outline-none"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError("");
                  setAppliedPromo("");
                  setPromoDiscount(0);
                }}
              />
              <button
                className="px-3 py-2 rounded-lg bg-customOrange text-white text-sm font-semibold disabled:opacity-50"
                onClick={() => handleApplyPromo(promoCode)}
                disabled={!promoCode.trim()}
              >
                {appliedPromo ? "Applied" : "Apply"}
              </button>
            </div>
            {promoError && (
              <span className="text-xs text-red-500">{promoError}</span>
            )}
            {appliedPromo && (
              <span className="text-xs text-green-600">
                Promo code <b>{appliedPromo}</b> applied! ({promoDiscount}% off)
              </span>
            )}
          </div>
          <div className="flex justify-between items-center text-base">
            <span className="font-roboto text-sm font-medium text-black/80">
              Subtotal
            </span>
            <span className="font-semibold text-black/90">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          {/* Discount row */}
          {promoDiscount > 0 && (
            <div className="flex justify-between items-center text-base">
              <span className="font-roboto text-sm font-medium text-green-700">
                Discount
              </span>
              <span className="font-semibold text-green-700">
                - ${promoDiscount}
              </span>
            </div>
          )}
          {/* Tax row */}
          <div className="flex justify-between items-center text-base mt-2">
            <span className="font-roboto text-sm font-medium text-black/80 flex items-center gap-1">
              Tax
            </span>
            <span className="font-semibold text-black/90">${tax.toFixed(2)}</span>
          </div>
          {/* Platform Fee row - moved just above Total */}
          <div className="flex justify-between items-center text-base relative group mt-2">
            <span className="font-medium font-roboto text-sm text-black/80 flex items-center gap-1">
              Platform Fee
              <button
                type="button"
                className="ml-1 text-customOrange bg-mainBg rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-customOrange cursor-pointer relative focus:outline-none"
                tabIndex="0"
              >
                i
                <span className="absolute left-1/2 -translate-x-1/2 top-7 z-10 hidden group-hover:block group-focus:block bg-mainBg text-black text-xs font-medium rounded-lg shadow-lg px-3 py-2 border border-black/10 min-w-[180px] whitespace-normal">
                  This fee helps us maintain and improve our platform.
                </span>
              </button>
            </span>
            <span className="font-semibold text-black/90">${platformFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold border-t border-customBeige pt-3">
            <span className="text-semibold font-roboto">Total</span>
            <span className="text-customOrange">${total.toFixed(2)}</span>
          </div>
          <button
            className="mt-1 w-full py-3 text-sm cursor-pointer rounded-xl bg-transparent hover:bg-customOrange text-customOrange hover:text-white border border-customOrange font-medium transition-colors duration-150 disabled:opacity-50 shadow"
            disabled={cart.length === 0}
            onClick={() => {
              setCheckoutModal(true);
            }}
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
