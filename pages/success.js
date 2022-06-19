import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

const success = () => {
  const { setcartItems, settotalPrice, settotalQuantity } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setcartItems([]);
    settotalPrice(0);
    settotalQuantity(0);
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check your email inbox for the receipt</p>
        <p className="description">
          if you have any questions, please email us ,{" "}
          <a href="mailto:taleemmankuer@gmail.com">here</a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
