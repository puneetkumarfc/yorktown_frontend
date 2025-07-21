import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import useCartStore from "../../hooks/useCartStore";
import { useNavigate } from "react-router-dom";
import { routeConstant } from "../../constants/RouteConstants";
import toast from "react-hot-toast";
import { fetchItemDetails } from "../../services/operations/menu";
import { useLoader } from "./LoaderContext";
import PizzaLoader from "./PizzaLoader";

const CustomizeModal = ({
  id,
  name,
  img,
  desc,
  priceFrom,
  showModal,
  onShowConfirmation,
}) => {
  const { showLoader, hideLoader, loading } = useLoader();
  const [itemDetails, setItemDetails] = useState({});

  const displayDetails = async (id) => {
    showLoader();
    try {
      const response = await fetchItemDetails(id);
      console.log(response.data.data);
      setItemDetails(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    displayDetails(id);
  }, []);

  useEffect(() => {
    setSelectedSize(itemDetails.prices?.[0]?.sizeId);
  }, [itemDetails]);

  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedBreads, setSelectedBreads] = useState([]);
  const [selectedCheese, setSelectedCheese] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isPresent, setIsPresent] = useState(false);
  const [showAddedModal, setShowAddedModal] = useState(false);

  const toggleTopping = (toppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const toggleBreads = (breadId) => {
    setSelectedBreads((prev) =>
      prev.includes(breadId)
        ? prev.filter((id) => id !== breadId)
        : [...prev, breadId]
    );
  };

  const toggleCheese = (cheeseId) => {
    setSelectedCheese((prev) =>
      prev.includes(cheeseId)
        ? prev.filter((id) => id !== cheeseId)
        : [...prev, cheeseId]
    );
  };

  const computeUnitPrice = () => {
    const sizePrice = itemDetails.prices?.find((size) => size.sizeId === selectedSize)?.price || 0;
    const toppingsPrice = selectedToppings.reduce((total, toppingId) => {
      const topping = itemDetails.toppings?.find((t) => t.id === toppingId);
      return total + (topping?.price || 0);
    }, 0);
    const breadsPrice = selectedBreads.reduce((total, breadId) => {
      const bread = itemDetails.breads?.find((b) => b.id === breadId);
      return total + (bread?.price || 0);
    }, 0);
    const cheesePrice = selectedCheese.reduce((total, cheeseId) => {
      const cheese = itemDetails.cheeses?.find((c) => c.id === cheeseId);
      return total + (cheese?.price || 0);
    }, 0);

    return sizePrice + toppingsPrice;
  };

  const calculatePrice = () => {
    const unitPrice = computeUnitPrice();
    return unitPrice * quantity;
  };

  const [finalPrice, setFinalPrice] = useState(() =>
    calculatePrice().toFixed(2)
  );

  useEffect(() => {
    setFinalPrice(calculatePrice().toFixed(2));
  }, [selectedSize, selectedToppings, quantity]);

  const { cart, addToCart, removeFromCart, totalItems } = useCartStore();

  //todo: create a delay of 2 seconds and toast the message
  const handleAddToCart = () => {
    const unitPrice = parseFloat(computeUnitPrice().toFixed(2));
    const newItem = {
      id,
      name: name,
      image: img,
      price: parseFloat((unitPrice * quantity).toFixed(2)),
      unitPrice,
      quantity: quantity,
      size: selectedSize,
      toppings: selectedToppings,
    };

    addToCart(newItem);
    showModal();
    if (onShowConfirmation) onShowConfirmation();
  };

  useEffect(() => {
    const matchedItem = cart.find(
      (item) =>
        item.id === id &&
        item.size === selectedSize &&
        JSON.stringify(item.toppings.sort()) ===
          JSON.stringify(selectedToppings.sort())
    );
    setIsPresent(!!matchedItem);
  }, [cart, selectedSize, selectedToppings]);

  // Auto-dismiss the added modal after 1.5s
  useEffect(() => {
    if (showAddedModal) {
      const timer = setTimeout(() => setShowAddedModal(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [showAddedModal]);

  return (
    <>
      {showAddedModal && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] flex items-center px-6 py-3 bg-green-500 text-white rounded-full shadow-lg animate-bounce-in">
          <span className="font-semibold mr-2">✔</span> Item added to bag!
        </div>
      )}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20">
        <div className="w-full max-w-4xl max-h-[91vh] overflow-y-auto rounded-xl bg-mainBg backdrop-blur-xl">
          <div className="h-[30vh] overflow-hidden rounded-t-md relative">
            <div
              className="p-2 rounded-full absolute top-1 right-1 bg-white/70 hover:bg-white transition-all duration-200 text-black border cursor-pointer"
              onClick={showModal}
            >
              <RxCross2 />
            </div>
            <img
              src={img}
              className="h-full w-full object-cover rounded-t-md"
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xl font-semibold font-roboto text-black">
                  {name}
                </p>
                <p className="font-poppins font-light text-black/70">{desc}</p>
              </div>

              <div className="flex gap-3 font-light text-sm">
                <button
                  type="button"
                  className="py-2 px-4 bg-transparent hover:bg-customOrange transition-all duration-200
                  border border-customOrange hover:border-transparent rounded-xl text-sm text-customOrange hover:text-white cursor-pointer"
                  onClick={
                    isPresent
                      ? () => navigate(routeConstant.BAG)
                      : handleAddToCart
                  }
                >
                  {isPresent ? "View Cart" : "Add to Bag"}
                </button>
                <button
                  className="py-2 px-4 bg-transparent hover:bg-customOrange transition-all duration-200
                  border border-customOrange hover:border-transparent rounded-xl text-sm text-customOrange hover:text-white cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <p className="mb-2 text-black font-medium">Size</p>
              <div className="w-full flex flex-wrap gap-3">
                {itemDetails.prices?.map((size) => {
                  return (
                    <button
                      key={size.sizeId}
                      onClick={() => setSelectedSize(size.sizeId)}
                      className={`flex flex-col py-2 px-6 rounded-xl border transition-all duration-150 cursor-pointer ${
                        selectedSize === size.sizeId
                          ? "border-mainRed/70 bg-red-50 text-mainRed"
                          : "border-black/5 hover:border-gray-300 text-black"
                      }`}
                    >
                      <div className="font-light text-sm font-poppins">
                        {size.sizeName}
                      </div>
                      {size.price > 0 && (
                        <div className="text-sm ">${size.price}</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toppings */}
            {itemDetails?.toppings?.length > 0 && (
              <div className="mt-6 mb-4">
                <p className="mb-2 text-black font-medium">Toppings</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {itemDetails?.toppings?.map((topping) => (
                    <button
                      key={topping.id}
                      onClick={() => toggleTopping(topping.toppingId)}
                      className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        selectedToppings.includes(topping.toppingId)
                          ? "border-mainRed/70 bg-red-50 text-mainRed"
                          : "border-black/5 hover:border-gray-300 text-black"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-light text-sm font-poppins">
                          {topping.toppingName}
                        </span>
                        {topping.sizePrices && (
                          <span className="text-sm">+${topping.price}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Breads */}
            {itemDetails?.breads?.length > 0 && (
              <div className="mt-6 mb-4">
                <p className="mb-2 text-black font-medium">Breads</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {itemDetails?.breads?.map((bread) => (
                    <button
                      key={bread.id}
                      onClick={() => toggleBreads(bread.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        selectedBreads.includes(bread.id)
                          ? "border-mainRed/70 bg-red-50 text-mainRed"
                          : "border-black/5 hover:border-gray-300 text-black"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-light text-sm font-poppins">
                          {bread.name}
                        </span>
                        {bread.price && (
                          <span className="text-sm">+${bread.price}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cheeses */}
            {itemDetails?.cheeses?.length > 0 && (
              <div className="mt-6 mb-4">
                <p className="mb-2 text-black font-medium">Cheeses</p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {itemDetails?.cheeses?.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => toggleCheese(size.id)}
                      className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        selectedCheese.includes(size.id)
                          ? "border-mainRed/70 bg-red-50 text-mainRed"
                          : "border-black/5 hover:border-gray-300 text-black"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-light text-sm font-poppins">
                          {size.name}
                        </span>
                        {size.sizePrices && (
                          <span className="text-sm">{selectedSize === 1 ? "+$0.50" : selectedSize === 2 ? "+$1.50" : "+$1.00"}</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-black/10">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-roboto font-semibold text-black">
                  Quantity:
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="cursor-pointer w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:border-customOrange hover:text-customOrange transition-colors"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="cursor-pointer w-8 h-8 rounded-full border border-black/20 flex items-center justify-center hover:border-customOrange hover:text-customOrange transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-black">
                  <span className="text-mainRed">$</span>
                  {finalPrice}
                </div>
              </div>
            </div>
          </div>
        </div>
        {loading && <PizzaLoader />}
      </div>
    </>
  );
};

export default CustomizeModal;
