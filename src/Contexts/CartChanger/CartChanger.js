/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, createContext } from "react";
import cartService from "../../Services/CartServices";

export const CartCountContext = createContext({});

const CartCount = (props) => {
  const [qty, setqty] = useState(0);
  const [changer, setChanger] = useState();

  const getCartCount = () => {
    cartService.getQty().then((data) => {
      setqty(data.data.count);
    });
  };
  useEffect(getCartCount, [changer]);
  return (
    <>
      <CartCountContext.Provider value={{ qty, setqty, setChanger }}>
        {props.children}
      </CartCountContext.Provider>
    </>
  );
};
export default CartCount;
