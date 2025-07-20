import React, { useEffect, useState } from "react";
import useCartStore from "../hooks/useCartStore";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import BagSidebar from "../components/bag/BagSidebar";
import { RxCross2 } from "react-icons/rx";
import AreYouSureModal from "../components/bag/AreYouSureModal";
import { routeConstant } from "../constants/RouteConstants";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const Bag = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [removeItem, setRemoveItem] = useState({});
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [manuallyReducedItemId, setManuallyReducedItemId] = useState(null);

  const displayAreYouSureModal = () => {
    setAreYouSureModal(!areYouSureModal);
  };

  const removeItemFromCart = () => {
    removeFromCart(removeItem);
    setManuallyReducedItemId(null);
  };

  function calculateStripeAdjustedAmount(desiredAmount) {
    const stripePercentage = 0.029; // 2.9%
    const stripeFixedFee = 0.3; // $0.30 flat fee

    const adjustedTotal =
      (desiredAmount + stripeFixedFee) / (1 - stripePercentage);
    return parseFloat(adjustedTotal.toFixed(2));
  }

  const chargeCustomer = calculateStripeAdjustedAmount(totalPrice());

  console.log(removeItem);
  console.log(cart);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-1">
        <div className={`transition-all duration-300 mt-28 w-full`}>
          <p className="uppercase font-roboto font-medium">Your food bag</p>

          {/* Summary box */}
          {cart.length > 0 && <div className="w-full mt-6 mb-4">
            <div className="w-full bg-sky-100 border border-sky-300 rounded-xl p-5 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-sky-900 mb-2">
                Order Summary
              </h3>
              <div className="flex justify-between items-center">
                <span className="font-medium text-sky-900">Subtotal</span>
                <span className="font-semibold text-sky-900">
                  ${totalPrice()}
                </span>
              </div>
              <div className="flex justify-between items-center relative group">
                <span className="font-medium text-sky-900 flex items-center gap-1">
                  Platform Fee
                  <button
                    type="button"
                    className="ml-1 text-sky-700 bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-sky-300 cursor-pointer relative focus:outline-none"
                    tabIndex="0"
                  >
                    i
                    <span className="absolute left-1/2 -translate-x-1/2 top-7 z-10 hidden group-hover:block group-focus:block bg-white text-sky-900 text-xs rounded-lg shadow-lg px-3 py-2 border border-sky-200 min-w-[180px] whitespace-normal">
                      This fee helps us maintain and improve our platform.
                    </span>
                  </button>
                </span>
                <span className="font-semibold text-sky-900">$1.99</span>
              </div>
              <button
                className="mt-4 w-full py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-base transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow"
                disabled={cart.length === 0}
                onClick={() => {
                  setCheckoutModal(true);
                }}
              >
                Continue to Checkout
              </button>
            </div>
          </div>}

          <div className="flex flex-col gap-4 mt-5 mb-10 w-full">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex items-center w-full gap-4">
                  <div className="flex w-full border border-black/20 rounded-xl overflow-hidden">
                    <div className="w-[20%] h-full hidden md:flex items-center justify-center">
                      <img
                        className="object-cover w-full h-32 rounded-l-md"
                        src={item.image}
                      />
                    </div>

                    <div className="flex justify-between items-center p-4 w-full">
                      <div className="flex flex-col gap-0">
                        <p className="font-roboto text-xl">{item.name}</p>
                        <p className="font-roboto text-sm text-black">
                          <span className="text-mainRed">$</span>
                          {item.price}
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <button
                          className="cursor-pointer w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:border-customOrange hover:text-customOrange transition-colors"
                          onClick={() =>
                            increaseQuantity(
                              `${item.id}-${item.size}-${JSON.stringify(
                                item.toppings
                              )}`,
                              1
                            )
                          }
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          className="cursor-pointer w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:border-customOrange hover:text-customOrange transition-colors"
                          onClick={() => {
                            if (item.quantity === 1) {
                              setRemoveItem(
                                `${item.id}-${item.size}-${JSON.stringify(
                                  item.toppings
                                )}`
                              );
                              displayAreYouSureModal();
                            } else {
                              decreaseQuantity(
                                `${item.id}-${item.size}-${JSON.stringify(
                                  item.toppings
                                )}`,
                                1
                              );
                            }
                          }}
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <RxCross2
                    className="text-xl text-black hover:text-customOrange cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      setRemoveItem(
                        `${item.id}-${item.size}-${JSON.stringify(
                          item.toppings
                        )}`
                      );
                      setManuallyReducedItemId(null);
                      displayAreYouSureModal();
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex items-center justify-center text-black/70 text-lg italic">
                Oops! No items in your bag.
                <span>
                  <a className="text-customOrange" href={routeConstant.MENU}>
                    Visit menu
                  </a>
                </span>
              </div>
            )}

            {totalItems() > 0 && (
              <div className="w-full flex items-col justify-between">
                <Link
                  to={routeConstant.MENU}
                  className="flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-200 font-medium font-roboto"
                >
                  <span>
                    <IoIosArrowBack />
                  </span>
                  Back to Shop
                </Link>
              </div>
            )}
          </div>
        </div>

        {checkoutModal && <BagSidebar setCheckoutModal={setCheckoutModal}/>}
      </div>

      {areYouSureModal && (
        <AreYouSureModal
          displayAreYouSureModal={displayAreYouSureModal}
          removeItemFromCart={removeItemFromCart}
          increaseQuantity={increaseQuantity}
          removeItem={removeItem}
          manuallyReducedItemId={manuallyReducedItemId}
        />
      )}
    </div>
  );
};

export default Bag;
