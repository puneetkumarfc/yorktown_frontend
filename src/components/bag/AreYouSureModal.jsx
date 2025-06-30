import React from 'react'

const AreYouSureModal = ({displayAreYouSureModal, removeItemFromCart}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Remove Item</h2>
        <p className="mb-6">Are you sure you want to remove this item from your cart?</p>
        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={displayAreYouSureModal}>Cancel</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" 
          onClick={() => {
            removeItemFromCart();
            displayAreYouSureModal();
            }}>
          Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default AreYouSureModal