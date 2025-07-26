import React, { useEffect, useState } from "react";
import useCartStore from "../hooks/useCartStore";
import { FiMinus, FiPlus } from "react-icons/fi";
import BagSidebar from "../components/bag/BagSidebar";
import { RxCross2 } from "react-icons/rx";
import AreYouSureModal from "../components/bag/AreYouSureModal";
import { routeConstant } from "../constants/RouteConstants";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import OrderSummary from "../components/bag/OrderSummary";
import { useLoader } from "../components/common/LoaderContext";
import CustomizeModal from "../components/common/CustomizeModal";
import { FaShoppingBag } from "react-icons/fa";
import Button from "../components/common/Button";
import { checkStatus } from "../services/operations/payments";
import toast from "react-hot-toast";
import ThankYouModal from "../components/bag/ThankYouModal";

const Bag = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCartStore();

  const { showLoader, hideLoader } = useLoader();
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [removeItem, setRemoveItem] = useState({});
  const [areYouSureModal, setAreYouSureModal] = useState(false);
  const [manuallyReducedItemId, setManuallyReducedItemId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const navigate = useNavigate();

  const displayAreYouSureModal = () => {
    setAreYouSureModal(!areYouSureModal);
  };

  const removeItemFromCart = () => {
    removeFromCart(removeItem);
    setManuallyReducedItemId(null);
  };
  
  // On component mount, check for payment verification status from URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const orderIdFromUrl = query.get("order_id");

    if (orderIdFromUrl) {
      const verifyPayment = async () => {
        showLoader("Verifying your payment...");
        try {
          const response = await checkStatus(orderIdFromUrl);

          if (response.data.status) {
            clearCart();
            setShowThankYouModal(true);
          } else {
            toast.error(response.data.message || "Payment verification failed. Please contact support.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error("An error occurred while verifying your payment.");
        } finally {
          hideLoader();
          // Clean up the URL to avoid re-triggering on refresh
          navigate(routeConstant.BAG, { replace: true });
        }
      };
      verifyPayment();
    }
  }, []);
  

  return (
    <div className="flex flex-col min-h-screen bg-mainBg py-10 px-2">
      <div className="relative w-full flex flex-col gap-8 min-h-[70vh] mt-18">
        {/* Order Summary (Right) */}
        <OrderSummary setCheckoutModal={setCheckoutModal} showLoader={showLoader} hideLoader={hideLoader}/>

        {/* Cart Items (Left) */}
        <div className={(cart.length > 0 ? "lg:w-2/3 " : "") + "w-full flex flex-col"}>
          <h2 className={`uppercase font-roboto font-medium text-md mb-2 text-black ${cart.length > 0 ? "" : "hidden"}`}>
            Your Bag
          </h2>

          <div className="flex flex-col gap-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.uniqueId} className="relative bg-mainBg border border-black/10 rounded-2xl shadow flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
                  {/* Remove button */}
                  <button
                    className="absolute -top-2 -right-2 cursor-pointer text-md bg-red-700 rounded-full p-1 text-white hover:bg-red-800 transition-colors duration-200"
                    onClick={() => {
                      setRemoveItem(item.uniqueId);
                      setManuallyReducedItemId(null);
                      displayAreYouSureModal();
                    }}
                    aria-label="Remove item"
                  >
                    <RxCross2 />
                  </button>
                  {/* Image */}
                  <div className="w-30 h-30 flex-shrink-0 flex items-center justify-center bg-customBeige/40 rounded-xl overflow-hidden">
                    {item.image ? (
                      <img
                        className="object-cover w-full h-full"
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <img
                          src="/pizza.png"
                          alt="No image"
                          className="w-12 h-12 opacity-70"
                        />
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    <div className="flex flex-col">
                      <p className="font-roboto text-lg font-semibold text-black truncate">
                        {item.name}
                      </p>
                      <p className="font-roboto text-center md:text-start text-base text-customOrange font-bold">
                        ${item.price}
                      </p>
                      
                    </div>

                    <button
                      className="text-customOrange font-normal hover:text-customOrange/60 transition-all duration-200 cursor-pointer underline"
                      onClick={() => setEditItem(item)}
                    >
                      Edit
                    </button>

                    {/* Quantity controls */}
                    <div className="flex flex-row items-center gap-3 mt-2">
                      <button
                        className="w-8 h-8 rounded-full border border-customOrange flex items-center justify-center text-customOrange hover:bg-customOrange hover:text-white transition-colors"
                        onClick={() => {
                          if (item.quantity === 1) {
                            setRemoveItem(item.uniqueId);
                            displayAreYouSureModal();
                          } else {
                            decreaseQuantity(item.uniqueId, 1);
                          }
                        }}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold text-lg w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full border border-customOrange flex items-center justify-center text-customOrange hover:bg-customOrange hover:text-white transition-colors"
                        onClick={() => increaseQuantity(item.uniqueId, 1)}
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-1 min-h-[70vh] items-center justify-center animate-fade-in-simple">
                <div className="flex flex-col items-center w-full">
                  <FaShoppingBag className="text-3xl mb-2"/>
                  <h2 className="text-xl font-semibold text-black mb-2 text-center font-roboto_serif">Your bag is empty</h2>
                  <p className="text-sm text-black/50 font-light mb-4 text-center font-roboto max-w-lg">You haven't added anything yet. Discover our delicious menu and add your favorites to your bag!</p>
                  <Button text={"Browse Menu"} path={routeConstant.MENU}/>
                </div>
              </div>
            )}

            {totalItems() > 0 && (
              <div className="w-full flex items-col justify-between mt-4">
                <Link
                  to={routeConstant.MENU}
                  className="flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-200 font-medium font-roboto text-customOrange"
                >
                  <span>
                    <IoIosArrowBack />
                  </span>
                  Back to Shop
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {checkoutModal && <BagSidebar setCheckoutModal={setCheckoutModal} orderId={orderId} setOrderId={setOrderId}/>}

      {areYouSureModal && (
        <AreYouSureModal
          displayAreYouSureModal={displayAreYouSureModal}
          removeItemFromCart={removeItemFromCart}
          increaseQuantity={increaseQuantity}
          removeItem={removeItem}
          manuallyReducedItemId={manuallyReducedItemId}
        />
      )}

      {editItem && (
        <CustomizeModal
          id={editItem.id}
          name={editItem.name}
          img={editItem.image}
          desc={editItem.desc}
          priceFrom={editItem.unitPrice}
          showModal={() => setEditItem(null)}
          editMode={true}
          size={editItem.size}
          toppings={editItem.toppings}
          quantity={editItem.quantity}
          bread={editItem.bread}
          cheese={editItem.cheese}
          uniqueId={editItem.uniqueId}
        />
      )}

      {showThankYouModal && <ThankYouModal setShowThankYouModal={setShowThankYouModal} />}
    </div>
  );
};

export default Bag;
