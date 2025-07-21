import React from 'react'

const AreYouSureModal = ({displayAreYouSureModal, removeItemFromCart}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
      <div className="p-6 rounded-xl shadow-lg max-w-lg w-full text-center bg-mainBg backdrop-blur-md mx-4">
        <h2 className="text-lg font-bold mb-1">Remove Item</h2>
        <p className="mb-6 text-black/70">Are you sure you want to remove this item from your cart? This action cannot be undone.</p>
        <div className="flex justify-center space-x-4">
          <button className="cursor-pointer px-4 py-2 bg-[#ffffff2a] rounded-xl hover:bg-black/10 transition-all duration-150" 
          onClick={() => {
            displayAreYouSureModal();
          }}>Cancel</button> 
          <button className="cursor-pointer px-4 py-2 bg-mainRed text-white rounded-xl hover:bg-mainRed/80 transition-all duration-150" 
          onClick={() => {
            removeItemFromCart();
            displayAreYouSureModal();
            }}>
          Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  )
}

export default AreYouSureModal