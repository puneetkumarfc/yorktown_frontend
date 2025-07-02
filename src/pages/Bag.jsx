import React, { useEffect, useState } from "react";
import useCartStore from "../hooks/useCartStore";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import BagSidebar from "../components/bag/BagSidebar";
import { RxCross2 } from "react-icons/rx";
import AreYouSureModal from "../components/bag/AreYouSureModal";
import { routeConstant } from "../constants/RouteConstants";

const Bag = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    increaseQuantity,
    decreaseQuantity, 
    clearCart, 
    totalItems,
    totalPrice
  } = useCartStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [removeItem, setRemoveItem] = useState({});
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [manuallyReducedItemId, setManuallyReducedItemId] = useState(null);

  //todo - rename to toggleModal
  const displayAreYouSureModal = () => {
    setAreYouSureModal(!areYouSureModal);
  }

  useEffect(() => {
    const itemToRemove = cart.find((cartItem) => cartItem.quantity < 1);
    if (itemToRemove) {
      setRemoveItem(itemToRemove.uniqueId);
      setManuallyReducedItemId(itemToRemove.uniqueId);
      displayAreYouSureModal();
    }
  }, [totalItems()]);

  const removeItemFromCart = () => {
    removeFromCart(removeItem);
    setManuallyReducedItemId(null);
  }

  console.log(removeItem);
  console.log(cart)

  return (
    <div className="relative flex min-h-[calc(100vh-60px)] mb-10">
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-[calc(100%-400px)]" : "w-[100%]"} px-6 mt-28`}>
        <p className="uppercase font-archivo font-semibold">
          Your<span className="text-mainRed"> food</span> bag
        </p>

        <div className="flex flex-col gap-4 mt-5 w-full">
          {
            cart.length > 0 ?
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between w-full">
                <div className="flex items-center border border-white/20 rounded-xl w-[97%]">
                  <div className="w-1/5 min-w-[200px] rounded-l-xl">
                    <img className="rounded-l-xl object-cover" src={item.image} />
                  </div>

                  <div className="flex justify-between items-center p-4 w-full">
                    <div className="flex flex-col items-start">
                      <p className="font-archivo text-xl">{item.name}</p>
                      <p className="font-poppins text-sm text-white/70">
                        <span className="text-mainRed">$</span>
                        {item.price}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <button className="cursor-pointer w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-mainYellow/80 hover:text-mainYellow/80 transition-colors"
                      onClick={() => increaseQuantity(`${item.id}-${item.size}-${JSON.stringify(item.toppings)}`, 1)}>
                        <FiPlus className="w-4 h-4"/>
                      </button>
                      <p>{item.quantity}</p>
                      <button className="cursor-pointer w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-mainYellow/80 hover:text-mainYellow/80 transition-colors"
                      onClick={() => decreaseQuantity(`${item.id}-${item.size}-${JSON.stringify(item.toppings)}`, 1)}>
                        <FiMinus className="w-4 h-4"/>
                      </button>
                    </div>
                  </div>
                </div>

                <RxCross2 className="text-xl text-white/50 hover:text-white cursor-pointer transition-colors duration-200" 
                onClick={() => {
                  setRemoveItem(`${item.id}-${item.size}-${JSON.stringify(item.toppings)}`);
                  setManuallyReducedItemId(null);
                  displayAreYouSureModal();
                }}/>
              </div>
            )) :
            <div className="w-full h-[50vh] flex items-center justify-center text-white/70 text-lg italic">
              Oops! No items in your bag.<span><a className="text-mainYellow/85" href={routeConstant.MENU}>Visit menu</a></span>
            </div>
          }

          <div>
            <p>Subtotal: $<span>{totalPrice()}</span></p>
          </div>
        </div>
      </div>

      <BagSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

      {
        areYouSureModal 
        && 
        <AreYouSureModal 
          displayAreYouSureModal={displayAreYouSureModal} 
          removeItemFromCart={removeItemFromCart} 
          increaseQuantity={increaseQuantity} 
          removeItem={removeItem}
          manuallyReducedItemId={manuallyReducedItemId}
        />
      }
    </div>
  );
};

export default Bag;
