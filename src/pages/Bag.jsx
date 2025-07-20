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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  console.log(removeItem);
  console.log(cart);

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="flex flex-1">
        <div className={`transition-all duration-300 mt-28 w-full`}>
          <p className="uppercase font-roboto font-medium">Your food bag</p>

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
                            increaseQuantity(`${item.id}-${item.size}-${JSON.stringify(item.toppings)}`,
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
                                `${item.id}-${item.size}-${JSON.stringify(item.toppings)}`
                              );
                              displayAreYouSureModal();
                            } else {
                              decreaseQuantity(
                                `${item.id}-${item.size}-${JSON.stringify(item.toppings)}`,
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
                        `${item.id}-${item.size}-${JSON.stringify(item.toppings)}`
                      );
                      setManuallyReducedItemId(null);
                      displayAreYouSureModal();
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex items-center justify-center text-white/70 text-lg italic">
                Oops! No items in your bag.
                <span>
                  <a className="text-mainYellow/85" href={routeConstant.MENU}>
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
                <p className="font-medium font-roboto">
                  Subtotal: <span className="text-mainRed">$</span>
                  <span className="">{totalPrice()}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* {totalItems() > 0 && <BagSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>} */}
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
