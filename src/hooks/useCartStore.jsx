import React from 'react'
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (item) => { 
                const uniqueId = `${item.id}-${item.size}-${JSON.stringify(item.toppings)}`
                const existing = get().cart.find(cartItem => cartItem.uniqueId === uniqueId);
                if(existing) {
                    set({
                        cart: get().cart.map((cartItem) => cartItem.uniqueId === item.uniqueId ? 
                        { 
                            ...cartItem, 
                            quantity: cartItem.quantity + item.quantity, 
                            price: cartItem.price + item.price,
                        } : 
                        cartItem),
                    })
                } else {
                    set({
                        cart: [...get().cart, { ...item, uniqueId }],
                    });
                }
            },
            removeFromCart: (id) => { 
                set({
                    cart: get().cart.filter(cartItem => cartItem.uniqueId !== id)
                })
            },
            updateQuantity: (id, qty) => { 
                set({
                    cart: get().cart.map((cartItem) => cartItem.uniqueId === id ? {...cartItem, quantity: cartItem.quantity + qty} : cartItem)
                })
            },
            clearCart: () => set({ cart: [] }),
            totalItemTypes: () => get().cart.length,
            totalItems: () => get().cart.reduce((acc, i) => acc + i.quantity, 0),
            totalPrice: () => get().cart.reduce((acc, i) => acc + i.price * i.quantity, 0).toFixed(2),
        }),
        {
            name: "cart-storage",
        }
    )
);

export default useCartStore