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

const CustomizeModal = ({
  id,
  name,
  img,
  desc,
  priceFrom,
  showModal,
  onShowConfirmation,
  onShowNextActionModal,
  editMode = false,
  size: initialSize,
  toppings: initialToppings,
  quantity: initialQuantity,
  uniqueId: originalUniqueId,
  // add more as needed
}) => {
  const { showLoader, hideLoader } = useLoader();
  const [itemDetails, setItemDetails] = useState({});

  // This useEffect now correctly handles data fetching and cleanup.
  useEffect(() => {
    // AbortController to cancel the request if the component unmounts.
    const controller = new AbortController();
    const { signal } = controller;

    const fetchAndSetDetails = async () => {
      showLoader();
      try {
        const response = await fetchItemDetails(id);

        // Only update state if the request was not aborted.
        if (!signal.aborted) {
          setItemDetails(response.data.data);
        }
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching item details:", error);
        }
      } finally {
        if (!signal.aborted) {
          hideLoader();
        }
      }
    };

    fetchAndSetDetails();

    // Cleanup function to abort the fetch on unmount.
    return () => controller.abort();
  }, [id, showLoader, hideLoader]); // Correct dependencies.

  useEffect(() => {
    // This effect correctly depends on itemDetails and sets the default size.
    if (itemDetails.prices && itemDetails.prices.length > 0) {
      setSelectedSize(itemDetails.prices[0].sizeId);
    }
  }, [itemDetails]);

  // Pre-fill state if in edit mode
  useEffect(() => {
    if (editMode) {
      if (initialSize) setSelectedSize(initialSize);
      if (initialToppings) setSelectedToppings(initialToppings);
      if (initialQuantity) setQuantity(initialQuantity);
    }
  }, [editMode, initialSize, initialToppings, initialQuantity]);

  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  // Change selectedBreads from array to single value
  const [selectedBreads, setSelectedBreads] = useState(null);
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

  // Update toggleBreads to allow only one selection
  const toggleBreads = (breadId) => {
    setSelectedBreads((prev) => (prev === breadId ? null : breadId));
  };

  // Update toggleCheese to always use numbers
  const toggleCheese = (cheeseId) => {
    setSelectedCheese((prev) =>
      prev.includes(Number(cheeseId))
        ? prev.filter((id) => id !== Number(cheeseId))
        : [...prev, Number(cheeseId)]
    );
  };

  const computeUnitPrice = () => {
    const sizePrice =
      itemDetails.prices?.find((size) => size.sizeId === selectedSize)?.price ||
      0;
    // Toppings
    const toppingsPrice = selectedToppings.reduce((total, toppingId) => {
      const topping = itemDetails.toppings?.find(
        (t) => t.toppingId === toppingId || t.id === toppingId
      );
      if (!topping || !Array.isArray(topping.sizePrices)) return total;
      let sizePriceObj = topping.sizePrices.find(
        (sp) => sp.sizeId === selectedSize
      );
      if (!sizePriceObj)
        sizePriceObj = topping.sizePrices.find((sp) => sp.sizeId === null);
      return (
        total +
        (sizePriceObj && Number(sizePriceObj.price)
          ? Number(sizePriceObj.price)
          : 0)
      );
    }, 0);

    // Breads (single selection)
    const breadsPrice = selectedBreads
      ? itemDetails.breads?.find((b) => b.id === selectedBreads)?.price || 0
      : 0;

    // Cheeses
    const cheesePrice = selectedCheese.reduce((total, cheeseId) => {
      const cheese = itemDetails.cheeses?.find((c) => c.id === cheeseId);
      if (!cheese || !Array.isArray(cheese.sizePrices)) return total;
      let sizePriceObj = cheese.sizePrices.find(
        (sp) => sp.sizeId === selectedSize
      );
      if (!sizePriceObj)
        sizePriceObj = cheese.sizePrices.find((sp) => sp.sizeId === null);
      return (
        total +
        (sizePriceObj && Number(sizePriceObj.price)
          ? Number(sizePriceObj.price)
          : 0)
      );
    }, 0);
    return sizePrice + toppingsPrice + breadsPrice + cheesePrice;
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
  }, [
    selectedSize,
    selectedToppings,
    selectedCheese,
    selectedBreads,
    itemDetails,
    quantity,
  ]);

  const { cart, addToCart, removeFromCart, totalItems } = useCartStore();

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
    showModal(); // closes the customize modal
    if (onShowNextActionModal) {
      setTimeout(() => onShowNextActionModal(), 300);
    }
    if (onShowConfirmation) onShowConfirmation();
  };

  const handleUpdateItem = () => {
    // Remove the old item by its original uniqueId
    if (originalUniqueId) removeFromCart(originalUniqueId);
    const unitPrice = parseFloat(computeUnitPrice().toFixed(2));
    const updatedItem = {
      id,
      name: name,
      image: img,
      price: parseFloat((unitPrice * quantity).toFixed(2)),
      unitPrice,
      quantity: quantity,
      size: selectedSize,
      toppings: selectedToppings,
    };
    addToCart(updatedItem);
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
      {/* Main Customize Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20">
        <div className="w-full max-w-4xl max-h-[91vh] overflow-y-auto rounded-xl bg-mainBg backdrop-blur-xl">
          <div className="h-[30vh] overflow-hidden rounded-t-md relative">
            <div
              className="p-2 rounded-full absolute top-1 right-1 bg-white/70 hover:bg-white transition-all duration-200 text-black border cursor-pointer"
              onClick={showModal}
            >
              <RxCross2 />
            </div>
            {img ? (
              <img
                src={img}
                className="h-full w-full object-cover rounded-t-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-customBeige/40">
                <img
                  src="/pizza.png"
                  alt="No image"
                  className="w-12 h-12 opacity-70 mt-6 mb-4"
                />
              </div>
            )}
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
                {editMode ? (
                  <button
                    type="button"
                    className="py-2 px-4 bg-customOrange text-white rounded-xl font-semibold hover:bg-orange-600 transition-all duration-200"
                    onClick={handleUpdateItem}
                  >
                    Update Item
                  </button>
                ) : (
                  <button
                    type="button"
                    className="py-2 px-4 bg-transparent hover:bg-customOrange transition-all duration-200 border border-customOrange hover:border-transparent rounded-xl text-sm text-customOrange hover:text-white cursor-pointer"
                    onClick={isPresent ? () => navigate(routeConstant.BAG) : handleAddToCart}
                  >
                    {isPresent ? "View Cart" : "Add to Bag"}
                  </button>
                )}
                <button
                  className="py-2 px-4 bg-transparent hover:bg-customOrange transition-all duration-200 border border-customOrange hover:border-transparent rounded-xl text-sm text-customOrange hover:text-white cursor-pointer"
                  onClick={() => {
                    navigate(routeConstant.BAG);
                  }}
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
                          : "border-black/10 hover:border-gray-300 text-black"
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
                  {itemDetails?.toppings
                    .filter((topping) => {
                      if (!Array.isArray(topping.sizePrices)) return false;
                      // Show if there is a sizePrice for selectedSize or for null (universal/free toppings)
                      return topping.sizePrices.some(
                        (sizePrice) =>
                          sizePrice.sizeId === selectedSize ||
                          sizePrice.sizeId === null
                      );
                    })
                    .map((topping) => {
                      // Prefer selectedSize, fallback to null
                      let sizePriceObj = topping.sizePrices.find(
                        (sizePrice) => sizePrice.sizeId === selectedSize
                      );
                      if (!sizePriceObj) {
                        sizePriceObj = topping.sizePrices.find(
                          (sizePrice) => sizePrice.sizeId === null
                        );
                      }
                      let priceLabel = "Free";
                      if (sizePriceObj && Number(sizePriceObj.price) > 0) {
                        priceLabel = `+$${sizePriceObj.price}`;
                      }
                      return (
                        <button
                          key={topping.toppingId || topping.id}
                          onClick={() => toggleTopping(topping.toppingId)}
                          className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                            selectedToppings.includes(topping.toppingId)
                              ? "border-mainRed/70 bg-red-50 text-mainRed"
                              : "border-black/10 hover:border-gray-300 text-black"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-light text-sm font-poppins">
                              {topping.toppingName}
                            </span>
                            <span className="text-sm">{priceLabel}</span>
                          </div>
                        </button>
                      );
                    })}
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
                        selectedBreads === bread.id
                          ? "border-mainRed/70 bg-red-50 text-mainRed"
                          : "border-black/10 hover:border-gray-300 text-black"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-light text-sm font-poppins">
                          {bread.name}
                        </span>
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
                  {itemDetails?.cheeses
                    .filter((cheese) => {
                      if (!Array.isArray(cheese.sizePrices)) return false;
                      return cheese.sizePrices.some(
                        (sizePrice) =>
                          sizePrice.sizeId === selectedSize ||
                          sizePrice.sizeId === null
                      );
                    })
                    .map((cheese) => {
                      // Prefer selectedSize, fallback to null
                      let sizePriceObj = cheese.sizePrices.find(
                        (sizePrice) => sizePrice.sizeId === selectedSize
                      );
                      if (!sizePriceObj) {
                        sizePriceObj = cheese.sizePrices.find(
                          (sizePrice) => sizePrice.sizeId === null
                        );
                      }
                      let priceLabel = "Free";
                      if (sizePriceObj && Number(sizePriceObj.price) > 0) {
                        priceLabel = `+$${sizePriceObj.price}`;
                      }
                      return (
                        <button
                          key={cheese.id}
                          onClick={() => toggleCheese(cheese.id)}
                          className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                            selectedCheese.includes(Number(cheese.id))
                              ? "border-mainRed/70 bg-red-50 text-mainRed"
                              : "border-black/10 hover:border-gray-300 text-black"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-light text-sm font-poppins">
                              {cheese.name}
                            </span>
                            <span className="text-sm">{priceLabel}</span>
                          </div>
                        </button>
                      );
                    })}
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
      </div>
    </>
  );
};

export default CustomizeModal;
