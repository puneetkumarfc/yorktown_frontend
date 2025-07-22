import React from 'react';
import { routeConstant } from '../../constants/RouteConstants';
import Button from '../common/Button';

const ThankYouModal = ({ setShowThankYouModal }) => {

  const handleClose = () => {
    setShowThankYouModal(false);
  };

  return (
    <>
      {/* Add a style tag for the animations. This can be moved to a global CSS file. */}
      <style>{`
        @keyframes scale-up {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes draw-check {
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-scale-up {
          animation: scale-up 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s forwards;
        }
        .animate-draw-check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: draw-check 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.4s forwards;
        }
      `}</style>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-mainBg p-8 shadow-2xl flex flex-col items-center text-center relative animate-fade-in-simple">
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5 animate-scale-up opacity-0 transform scale-80">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path className="animate-draw-check" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Message */}
          <h2 className="text-2xl font-bold mb-3 text-black font-roboto_serif">
            Thank You!
          </h2>
          <p className="text-sm text-black/70 mb-8 font-roboto font-light max-w-sm">
            Your order has been confirmed. A confirmation email has been sent to you.
          </p>
          {/* Button */}
          <Button text={"Continue Shopping"} path={routeConstant.MENU} onClick={handleClose}/>
        </div>
      </div>
    </>
  );
};

export default ThankYouModal;