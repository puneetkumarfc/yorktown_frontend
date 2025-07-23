import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { routeConstant } from "../../constants/RouteConstants";
import { IoIosArrowForward } from "react-icons/io";

const AddedToBagModal = ({showNextActionModal, setShowNextActionModal}) => {

    return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/30">
      <div className="w-full max-w-lg rounded-xl bg-mainBg p-10 shadow-2xl flex flex-col items-center relative animate-fade-in-simple">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4 shadow-md">
          <svg
            className="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="11"
              stroke="currentColor"
              strokeOpacity="0.15"
              fill="white"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 13l3 3 6-6"
            />
          </svg>
        </div>
        {/* Message */}
        <h2 className="text-xl font-semibold mb-2 text-black text-center font-roboto_serif">
          Item added to your bag!
        </h2>
        <p className="text-sm text-black/70 text-center mb-8 font-roboto font-light">
          Would you like to keep shopping for more delicious items, or view your
          bag to checkout?
        </p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <div className='flex items-center justify-center gap-1 w-auto px-4 py-3 bg-customOrange hover:bg-transparent transition-all duration-200
          border border-customOrange hover:border-customOrange rounded-full text-sm text-white hover:text-customOrange cursor-pointer'
          onClick={() => setShowNextActionModal(false)}>
              <p>Continue Shopping</p>
      
              <IoIosArrowForward />
          </div>
          <Button text={"View bag"} path={routeConstant.BAG}/>
        </div>
      </div>
    </div>
  );
};

export default AddedToBagModal;
