import React, { useEffect, useState } from "react";
import useCartStore from "../hooks/useCartStore";
import { FiMinus, FiPlus } from "react-icons/fi";
import BagSidebar from "../components/bag/BagSidebar";
import { RxCross2 } from "react-icons/rx";
import AreYouSureModal from "../components/bag/AreYouSureModal";
import { routeConstant } from "../constants/RouteConstants";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import OrderSummary from "../components/bag/OrderSummary";
import { LoaderProvider, useLoader } from "../components/common/LoaderContext";
import PizzaLoader from "../components/common/PizzaLoader";

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

  const { showLoader, hideLoader, loading} = useLoader();
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

  return (
    <div className="flex flex-col min-h-screen bg-mainBg py-10 px-2">
      <div className="relative w-full flex flex-col gap-8 min-h-[70vh] mt-18">
        {/* Order Summary (Right) */}
        <OrderSummary setCheckoutModal={setCheckoutModal} showLoader={showLoader} hideLoader={hideLoader}/>

        {/* Cart Items (Left) */}
        <div className="lg:w-2/3 w-full flex flex-col">
          <h2 className="uppercase font-roboto font-medium text-md mb-2 text-black">
            Your Bag
          </h2>

          <div className="flex flex-col gap-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${JSON.stringify(
                    item.toppings
                  )}`}
                  className="relative bg-mainBg border border-customBeige rounded-2xl shadow flex flex-col md:flex-row items-center gap-4 p-4 md:p-6"
                >
                  {/* Remove button */}
                  <button
                    className="absolute -top-2 -right-2 cursor-pointer text-md bg-red-700 rounded-full p-1 text-white hover:bg-red-800 transition-colors duration-200"
                    onClick={() => {
                      setRemoveItem(
                        `${item.id}-${item.size}-${JSON.stringify(
                          item.toppings
                        )}`
                      );
                      setManuallyReducedItemId(null);
                      displayAreYouSureModal();
                    }}
                    aria-label="Remove item"
                  >
                    <RxCross2 />
                  </button>

                  {/* Image */}
                  <div className="w-30 h-30 flex-shrink-0 flex items-center justify-center bg-customBeige/40 rounded-xl overflow-hidden">
                    {item.image ? (
                      <img
                        className="object-cover w-full h-full"
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <img
                          src="/pizza.png"
                          alt="No image"
                          className="w-12 h-12 opacity-70"
                        />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    <div className="flex flex-col">
                      <p className="font-roboto text-lg font-semibold text-black truncate">
                        {item.name}
                      </p>
                      <p className="font-roboto text-center md:text-start text-base text-customOrange font-bold">
                        ${item.price}
                      </p>
                    </div>
                    {/* Quantity controls */}
                    <div className="flex md:flex-col items-center gap-3 mt-2">
                      <button
                        className="w-8 h-8 rounded-full border border-customOrange flex items-center justify-center text-customOrange hover:bg-customOrange hover:text-white transition-colors"
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
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full border border-customOrange flex items-center justify-center text-customOrange hover:bg-customOrange hover:text-white transition-colors"
                        onClick={() =>
                          increaseQuantity(
                            `${item.id}-${item.size}-${JSON.stringify(
                              item.toppings
                            )}`,
                            1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex items-center justify-center text-black/70 text-lg italic">
                Oops! No items in your bag.{" "}
                <span>
                  <Link
                    className="text-customOrange ml-2 underline"
                    to={routeConstant.MENU}
                  >
                    Visit menu
                  </Link>
                </span>
              </div>
            )}

            {totalItems() > 0 && (
              <div className="w-full flex items-col justify-between mt-4">
                <Link
                  to={routeConstant.MENU}
                  className="flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-200 font-medium font-roboto text-customOrange"
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
      </div>

      {checkoutModal && <BagSidebar setCheckoutModal={setCheckoutModal} />}

      {areYouSureModal && (
        <AreYouSureModal
          displayAreYouSureModal={displayAreYouSureModal}
          removeItemFromCart={removeItemFromCart}
          increaseQuantity={increaseQuantity}
          removeItem={removeItem}
          manuallyReducedItemId={manuallyReducedItemId}
        />
      )}

      {loading && <PizzaLoader />}
    </div>
  );
};

export default Bag;
