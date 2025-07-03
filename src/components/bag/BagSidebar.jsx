import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import UserDetails from "./UserDetails";
import { form } from "framer-motion/client";
import AddressDetails from "./AddressDetails";
import PaymentDetails from "./PaymentDetails";

const BagSidebar = ({isSidebarOpen, setIsSidebarOpen}) => {

  const [formStep, setFormStep] = useState(1);
  
  const handleNext = (e) => {
    e.preventDefault();
    setFormStep(formStep + 1);
  }

  return (
    <div className={`z-0 fixed top-0 right-0 h-full max-w-[400px] bg-mainYellow/50 transform transition-transform duration-300 ${
      isSidebarOpen ? "translate-x-0" : "translate-x-[98%]"}`}>
      {/* Toggle button inside sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="cursor-pointer absolute top-1/2 left-0 -translate-x-full bg-mainYellow/50 text-white text-lg h-11 w-6 rounded-l-full flex items-center justify-end">
        {isSidebarOpen ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </button>

      <div className="flex flex-col p-8 mt-28">
        <div className="flex items-center w-full mb-8">
          <p className={`${formStep === 1 ? "text-2xl" : "text-sm"}`}>01</p>
          <div className="w-full min-h-[0.2px] bg-white/60 mx-4"></div>
          <p className={`${formStep === 2 ? "text-2xl" : "text-sm"}`}>02</p>
          <div className="w-full min-h-[0.2px] bg-white/60 mx-4"></div>
          <p className={`${formStep === 3 ? "text-2xl" : "text-sm"}`}>03</p>
        </div>

        { 
          formStep === 1 ? <UserDetails setFormStep={setFormStep} formStep={formStep} handleNext={handleNext}/> :
          formStep === 2 ? <AddressDetails setFormStep={setFormStep} formStep={formStep} handleNext={handleNext}/> :
          <PaymentDetails setFormStep={setFormStep} formStep={formStep} handleNext={handleNext}/>
        }
      </div>
    </div>
  );
};

export default BagSidebar;
