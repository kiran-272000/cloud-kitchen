import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import CartContext from "../../Store/CartContext";
import Model from "../UI/Model";

import classes from "./Cart.module.css";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isCheckOut, setisCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null);

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
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const orderDetails = cartCtx.item.map((orderDetail) => {
      return {
        name: orderDetail.name,
        price: orderDetail.price,
        amount: orderDetail.amount,
      };
    });
    console.log(orderDetails);
    try {
      const response = await fetch(
        "https://cloud-kitchen-gk.herokuapp.com/api/kitchen/cart",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderItems: orderDetails,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong...");
      }
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (err) {
      setError(err.message);
    }
    setIsSubmitting(false);
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

  const cartModelContemt = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`₹${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      {isCheckOut && (
        <Checkout onCancel={props.onClose} onUserSubmit={submitOrderHandler} />
      )}
      {!isCheckOut && modelAction}
    </React.Fragment>
  );

  const isSubmittingModel = <h3>Ordering...</h3>;

  const didSubmitModel = (
    <React.Fragment>
      <h3>Your Order taken, will be delivered Soon</h3>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const errorModel = <h3>{error}</h3>;

  return (
    <Model onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModelContemt}
      {isSubmitting && isSubmittingModel}
      {didSubmit && !isSubmitting && didSubmitModel}
      {!isSubmitting && !didSubmit && error && errorModel}
    </Model>
  );
};

export default Cart;
