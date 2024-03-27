import React, { createContext, useContext, useState,useEffect } from 'react';
const CartContext = createContext(null);

const CART_KEY = 'cart';
const EMPTY_CART = {
  items:[],
  quantity : 0,
  price:0,
}

export default function CartProvider({ children }) {
  const sum = items => {
    return items.reduce((prevValue, currValue) => prevValue + currValue , 0);
  }
  const initCart = getFromLocalStorage();
  const [cartItems, setCartItems] = useState(initCart.items);
  const [totalPrice, setTotalPrice] = useState(initCart.price);
  const [totalCount, setTotalCount] = useState(initCart.quantity);

  useEffect(() => {
    const newTotalPrice = sum(cartItems.map(item => item.price));
    setTotalPrice(newTotalPrice);

    const newTotalCount = sum(cartItems.map(item => item.quantity));
    setTotalCount(newTotalCount);

    localStorage.setItem(CART_KEY, JSON.stringify({
      items: cartItems,
      price:totalPrice,
      quantity :totalCount,
    }))
  },[cartItems,totalPrice,totalCount]
  );

  
  const removeCartItems = foodId => {
    const filteredCartItems = cartItems.filter(item => foodId !== item.food.id);
    setCartItems(filteredCartItems);
  };

  const changeQuantity = (item, newQuantity) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.food.id === item.food.id) {
        return {
          ...cartItem,
          quantity: newQuantity,
          price: item.food.price * newQuantity,
        };
      }
      return cartItem;
    });
  
    setCartItems(updatedCartItems);
  };
  const addToCart = (food) =>{
    const cartItem = cartItems.find(item => (item.food.id === food.id));
    if(cartItem){
      changeQuantity(cartItem,cartItem.quantity + 1);
    }
    else{
      const changedCartItems = [...cartItems ,{ food ,quantity:1,price : food.price,}];
      setCartItems(changedCartItems);
    }
  }
  function getFromLocalStorage(){
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }
  
  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount,},
        removeCartItems,
        changeQuantity,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
