import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  function addToCart(item) {

    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (itemInCart) {
      setCartItems(
        cartItems.map(
          (cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 }
            }
            return cartItem
          }
        )
      )
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  }

  function subtractFromCart(item) {
    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    if (itemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map(
          (cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity - 1 }
            } else {
              return cartItem
            }
          }
        )
      )
    }
  }

  function clearCart() {
    setCartItems([]);
  }

  function getCartTotal() {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );
    return total.toFixed(2)
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("total",getCartTotal());
  }, [cartItems]);

  useEffect(() => {

    const cartItems = localStorage.getItem('cartItems');

    if (cartItems) {
      setCartItems(JSON.parse(cartItems))
    }

  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, subtractFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>

  )
}