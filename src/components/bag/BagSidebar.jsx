import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import UserDetails from "./UserDetails";

const BagSidebar = ({isSidebarOpen, setIsSidebarOpen}) => {

  const [formStep, setFormStep] = useState(1);

  return (
    <div className={`fixed top-0 right-0 h-screen max-w-[400px] bg-mainYellow/50 transform transition-transform duration-300 ${
      isSidebarOpen ? "translate-x-0" : "translate-x-[98%]"}`}>
      {/* Toggle button inside sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="cursor-pointer absolute top-1/2 left-0 -translate-x-full bg-mainYellow/50 text-white text-lg h-11 w-6 rounded-l-full flex items-center justify-end">
        {isSidebarOpen ? <IoIosArrowForward /> : <IoIosArrowBack />}
      </button>

      <div className="flex flex-col p-8 mt-35">
        <UserDetails/>
      </div>
    </div>
  );
};

export default BagSidebar;
