import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';

const pizzaMessages = [
  'Baking your pizza...',
  'Firing up the oven...',
  'Rolling out the dough...',
  'Adding extra cheese...',
  'Tossing your pizza sky-high...',
  'Heating up the sauce...'
];

const PizzaLoader = ({ loading, size = 80 }) => {
  const [message, setMessage] = useState(pizzaMessages[0]);

  useEffect(() => {
    if (loading) {
      const randomMsg = pizzaMessages[Math.floor(Math.random() * pizzaMessages.length)];
      setMessage(randomMsg);
    }
  }, [loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full absolute inset-0 bg-black/60 z-50">
      <div className="relative">
        <PuffLoader color="#F3D053" loading={loading} size={size} speedMultiplier={1.2} />
        <img
          src="/MainPizza.png"
          alt="Pizza Loader"
          className="absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
          style={{ animationDuration: '2.5s' }}
        />
      </div>
      <p className="mt-4 text-mainYellow text-lg font-archivo font-semibold tracking-wide">{message}</p>
    </div>
  );
};

export default PizzaLoader; 