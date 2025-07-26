import React from "react";

const CustomButton = ({ text, image, onClick, active, type }) => {
  const Icon = image || null;

  const buttonStateClasses = active
    ? "bg-black/90 hover:bg-mainBg"
    : "bg-mainBg hover:bg-black/90";

  const iconStateClasses = active
    ? "text-white group-hover:text-black/20"
    : "text-black/20 group-hover:text-white";

  const textStateClasses = active
    ? "text-white group-hover:text-black/90"
    : "text-black/80 group-hover:text-white";

  return (
    <button
      className={`border border-black/20 rounded-xl flex gap-2 items-center w-fit py-2 px-3 group transition-all duration-200 cursor-pointer ${buttonStateClasses}`}
      onClick={onClick}
      type={type}
    >
      {image && (
        <Icon
          className={`transition-all duration-200 ${iconStateClasses}`}
          strokeWidth={1.2}
        />
      )}
      <span
        className={`transition-all text-nowrap duration-200 font-medium ${textStateClasses}`}
      >
        {text}
      </span>
    </button>
  );
};

export default CustomButton;
