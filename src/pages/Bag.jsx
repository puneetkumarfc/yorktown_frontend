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
import CustomizeModal from "../components/common/CustomizeModal";
import { FiEdit2 } from "react-icons/fi";

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
  const [editItem, setEditItem] = useState(null);

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
        <div className={(cart.length > 0 ? "lg:w-2/3 " : "") + "w-full flex flex-col"}>
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
                      <button
                        className="mt-3 mx-auto px-6 py-2 bg-customOrange text-white rounded-full font-semibold hover:bg-white hover:text-customOrange border border-customOrange transition-all duration-200 cursor-pointer"
                        onClick={() => setEditItem(item)}
                      >
                        Edit
                      </button>
                    </div>
                    {/* Quantity controls */}
                    <div className="flex flex-row items-center gap-3 mt-2">
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
              <div className="flex flex-1 min-h-[70vh] items-center justify-center animate-fade-in-simple">
                <div className="flex flex-col items-center w-full">
                  {/* SVG illustration */}
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="4rem" width="4rem" xmlns="http://www.w3.org/2000/svg"><path d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"></path></svg>
                  <h2 className="text-3xl font-extrabold text-black mb-2 text-center font-roboto">Your bag is empty</h2>
                  <p className="text-lg text-black/60 mb-8 text-center font-poppins max-w-lg">You haven&apos;t added anything yet. Discover our delicious menu and add your favorites to your bag!</p>
                  <Link
                    to={routeConstant.MENU}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-customOrange hover:bg-transparent border border-customOrange rounded-full text-lg text-white hover:text-customOrange font-semibold shadow transition-all duration-200"
                  >
                    <span>Browse Menu</span>
                  </Link>
                </div>
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

      {editItem && (
        <CustomizeModal
          id={editItem.id}
          name={editItem.name}
          img={editItem.image}
          desc={editItem.desc}
          priceFrom={editItem.unitPrice}
          showModal={() => setEditItem(null)}
          editMode={true}
          size={editItem.size}
          toppings={editItem.toppings}
          quantity={editItem.quantity}
          uniqueId={editItem.uniqueId}
        />
      )}

      {loading && <PizzaLoader />}
    </div>
  );
};

export default Bag;
