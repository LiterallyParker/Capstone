import { createContext, useState, useEffect, Children } from "react";

export const CartContext = createContext("");

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  function addToCart(item) {

    const itemInCart = cartItems.find((cartItem) => cartItem.id === item.id);
    console.log(itemInCart)
    if (itemInCart) {
      setCartItems(
        cartItems.map(
          (cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 }
            }
            return cartItem
          }
            // 
            // ? 
            // : cartItem
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
          (cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
        )
      )
    }
  }

  function clearCart() {
    setCartItems([]);
  }

  function getCartTotal() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 0
    )
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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