import React, { useState } from "react";
import useCartStore from "../hooks/useCartStore";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import BagSidebar from "../components/bag/BagSidebar";
import { RxCross2 } from "react-icons/rx";

const Bag = () => {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    total 
  } = useCartStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log(cart);

  return (
    <div className="relative flex min-h-[calc(100vh-60px)]">
      <div className={`transition-all duration-300 ${isSidebarOpen ? "w-[calc(100%-400px)]" : "w-[100%]"} px-6 mt-28`}>
        <p className="uppercase font-archivo font-semibold">
          Your<span className="text-mainRed"> food</span> bag
        </p>

        <div className="flex flex-col gap-4 mt-5 w-full">
          {
            cart.length > 0 ?
            cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between w-full">
                <div className="flex items-center border border-white/20 rounded-xl w-[98%]">
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
                      <button className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-mainYellow/80 hover:text-mainYellow/80 transition-colors">
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <p>{item.quantity}</p>
                      <button className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-mainYellow/80 hover:text-mainYellow/80 transition-colors">
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <RxCross2 className="text-xl text-white/50 hover:text-white cursor-pointer transition-colors duration-200" 
                onClick={() => removeFromCart(`${item.id}-${item.size}-${JSON.stringify(item.toppings)}`)}/>
              </div>
            )) :
            <div className="w-full h-[50vh] flex items-center justify-center text-white/70 text-lg italic">
              Oops! No items in your bag.
            </div>
          }
        </div>
      </div>

      <BagSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
    </div>
  );
};

export default Bag;
