import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

export const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [storageItems, setstorageItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalQuantity, settotalQuantity] = useState(0);
  const [qty, setqty] = useState(1);

  let foundProduct;
  let index;

  const OnAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item?._id === product?._id
    );

    settotalPrice((prev) => prev + product.price * quantity);
    settotalQuantity((preve) => preve + quantity);
    if (checkProductInCart) {
      const updatedItems = cartItems.map((cartProduct) => {
        if (cartProduct?._id === product?._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
      });

      setcartItems(updatedItems);
    } else {
      product.quantity = quantity;

      setcartItems([...cartItems, { ...product }]);
    }
    const localstorage = localStorage.getItem("cart");
    localStorage.setItem("cart", JSON.stringify(cartItems));
    const localStorageCartItems = JSON.parse(localstorage);
    setstorageItems(localStorageCartItems);
    toast.success(`${qty} ${product.name} added to cart.`);
  };

  const onRemove = (product) => {
    // foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItem = cartItems.filter((item) => item._id !== product._id);

    setcartItems(newCartItem);
    settotalQuantity((prev) => prev - product.quantity);
    settotalPrice((prev) => prev - product.price * qty);
  };

  const toggleCartQuantity = (id, val) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id == id);
    const newCartItem = cartItems.filter((item) => item._id !== id);

    if (val === "inc") {
      let newCartItems = [
        ...newCartItem,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ];
      setcartItems(newCartItems);
      settotalPrice((prev) => prev + foundProduct.price);
      settotalQuantity((prev) => prev + 1);
    } else if (val === "dec") {
      if (foundProduct.quantity > 1) {
        let newCartItems = [
          ...newCartItem,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ];
        setcartItems(newCartItems);
        settotalPrice((prev) => prev - foundProduct.price);
        settotalQuantity((prev) => prev - 1);
      }
    }
  };

  const increaseQty = () => {
    setqty((prevqty) => prevqty + 1);
  };

  const decreaseQty = () => {
    setqty((prevqty) => {
      if (prevqty - 1 < 1) return 1;

      return prevqty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        increaseQty,
        decreaseQty,
        qty,
        OnAdd,
        setShowCart,
        totalQuantity,
        showCart,
        totalPrice,
        storageItems,
        setcartItems,
        toggleCartQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
