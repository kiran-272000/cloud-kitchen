import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CartContext from "../../Store/CartContext";
import Model from "../UI/Model";

import classes from "./Cart.module.css";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckOut, setisCheckOut] = useState(false);
  const [orderItem, setorderItem] = useState([]);
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx);
  const hasItem = cartCtx.item.length > 0;

  const removeItemCart = (id) => {
    cartCtx.removeItem(id);
  };

  const addItemCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const checkOutHandler = () => {
    setisCheckOut(true);
    const orderDetails = cartCtx.item.map((orderDetail) => {
      return {
        id: orderDetail.id,
        amount: orderDetail.amount,
      };
    });
    setorderItem(orderDetails);
  };

  const submitOrderHandler = (userData) => {
    console.log(userData);
    console.log(orderItem);
    fetch("https://cloud-kitchen-gk.herokuapp.com/api/kitchen/cart", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderItems: orderItem,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const modelAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={checkOutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.item.map((item) => (
        <CartItem
          name={item.name}
          key={item.id}
          amount={item.amount}
          price={item.price}
          onRemove={removeItemCart.bind(null, item.id)}
          onAdd={addItemCart.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`₹${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckOut && (
        <Checkout onCancel={props.onClose} onUserSubmit={submitOrderHandler} />
      )}
      {!isCheckOut && modelAction}
    </Model>
  );
};

export default Cart;
