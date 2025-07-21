import React from "react";
import useCartStore from "../../hooks/useCartStore";

const OrderSummary = ({ setCheckoutModal }) => {
  const { cart, totalPrice } = useCartStore();

  const platformFee = 1.99;
  const subtotal = totalPrice();
  const total = (Number(subtotal) + platformFee).toFixed(2);

  return (
    <div className="md:w-[360px] w-full flex lg:fixed right-0">
      <div className="w-full md:max-w-xs">
        <div className="bg-mainBg backdrop-blur-xl border border-customBeige rounded-2xl shadow-xl p-7 flex flex-col gap-5">
          <h3 className="text-xl font-bold text-customOrange mb-2">
            Order Summary
          </h3>
          <div className="flex justify-between items-center text-base">
            <span className="font-roboto text-sm font-medium text-black/80">
              Subtotal
            </span>
            <span className="font-semibold text-black/90">${subtotal}</span>
          </div>
          <div className="flex justify-between items-center text-base relative group">
            <span className="font-medium font-roboto text-sm text-black/80 flex items-center gap-1">
              Platform Fee
              <button
                type="button"
                className="ml-1 text-customOrange bg-mainBg rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-customOrange cursor-pointer relative focus:outline-none"
                tabIndex="0"
              >
                i
                <span className="absolute left-1/2 -translate-x-1/2 top-7 z-10 hidden group-hover:block group-focus:block bg-white text-black text-xs rounded-lg shadow-lg px-3 py-2 border border-customBeige min-w-[180px] whitespace-normal">
                  This fee helps us maintain and improve our platform.
                </span>
              </button>
            </span>
            <span className="font-semibold text-black/90">${platformFee}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold border-t border-customBeige pt-3">
            <span className="text-semibold font-roboto">Total</span>
            <span className="text-customOrange">${total}</span>
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
