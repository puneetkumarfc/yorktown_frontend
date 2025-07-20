import React, { useState } from "react";
import CustomizeModal from "./CustomizeModal";

const ItemCard = ({ id, name, img, desc, priceFrom }) => {
  const [displayModal, setDisplayModal] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const showModal = () => {
    setDisplayModal(!displayModal);
  };

  // Determine if we have a valid image
  const hasImage = !!img;

  return (
    <div className="rounded-2xl w-full flex flex-col items-center gap-0 border border-customBeige/60 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-[300px]">
      <div className="w-full flex justify-center items-center relative h-[240px] bg-customBeige/40 overflow-hidden">
        {hasImage ? (
          <>
            {!imageLoaded && (
              <div
                className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 bg-opacity-40 absolute left-0 top-0 overflow-hidden animate-pulse-slow"
                style={{ opacity: 0.4 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/pizza.png"
                    alt="Pizza icon"
                    className="w-8 h-9 opacity-80"
                  />
                </div>
                <div className="absolute inset-0 shimmer" />
              </div>
            )}
            <img
              src={img}
              className={`w-full h-full max-h-[240px] object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              alt={name}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/pizza.png"
              alt="No image"
              className="w-12 h-12 opacity-70 mt-6 mb-4"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full items-center justify-between px-4 py-3 h-full">
        <p className="text-cente font-roboto font-semibold  text-primary mb-1">
          {name}
        </p>
        <p className="text-center text-sm font-light text-black/60 mt-1 mb-3 min-h-[40px]">
          {desc}
        </p>

        <div className="flex w-full justify-between items-end mt-auto">
          <div className="flex flex-col items-start">
            <p className="text-xs text-customOrange font-semibold">From</p>
            <p className="text-base text-primary font-bold">
              {priceFrom.toFixed(2)}$
            </p>
          </div>

          <div
            className="text-white bg-customOrange text-xs rounded-full cursor-pointer hover:bg-mainYellow hover:text-customOrange px-4 py-2 transition-all duration-200 font-semibold shadow-md"
            onClick={showModal}
          >
            Customize
          </div>
        </div>
      </div>

      {displayModal && (
        <CustomizeModal
          id={id}
          name={name}
          img={img}
          desc={desc}
          priceFrom={priceFrom}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default ItemCard;
