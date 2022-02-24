import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import CartContext from "../../../Store/CartContext";
import CartItem from "./CartItem";
import { Card } from "../../UI/Card";
import Checkout from "./Checkout";
import empty_cart from "../../../Assets/empty_cart.jpeg";
import classes from "./Cart.module.css";

const MyCart = (props) => {
  const [checkOutForm, setCheckOutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null);

  const cartCtx = useContext(CartContext);

  const hasItem = cartCtx.item.length > 0;
  const removeItemCart = (id) => {
    cartCtx.removeItem(id);
  };
  const addItemCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const checkOutFormHandler = () => {
    setCheckOutForm(!checkOutForm);
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
    // console.log(orderDetails);
    try {
      const response = await fetch(
        "https://cloud-kitchen-gk.herokuapp.com/api/kitchen/cart",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderItems: orderDetails,
            token: window.sessionStorage.getItem("accessToken"),
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
      <Link to="/">
        <button className={classes["button--alt"]}>Continue Shopping</button>
      </Link>
      {hasItem && (
        <button className={classes.button} onClick={checkOutFormHandler}>
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
      {hasItem && cartItems}
      {!hasItem && (
        <>
          <div className={classes["cart-image"]}>
            <img src={empty_cart} alt="Your Cart is Empty" />
          </div>
          <div className={classes["cartEmpty-msg"]}>
            <span>Your Cart Is Empty Continue Shopping...</span>
          </div>
        </>
      )}
      {hasItem && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{`₹${cartCtx.totalAmount.toFixed(2)}`}</span>
        </div>
      )}
      {modelAction}
    </React.Fragment>
  );
  const isSubmittingModel = (
    <div className={classes.message}>
      <h3>Ordering...</h3>
    </div>
  );

  const didSubmitModel = (
    <React.Fragment>
      <div className={classes.message}>
        <h3>Your Order taken, will be delivered Soon</h3>
      </div>
      <div className={classes.actions}>
        <Link to="/">
          <button className={classes.button}>Home</button>
        </Link>
      </div>
    </React.Fragment>
  );

  const errorModel = (
    <div className={classes.message}>
      <h3>{error}</h3>
    </div>
  );

  return (
    <section className={classes.cart}>
      {checkOutForm && (
        <Checkout
          onCancel={checkOutFormHandler}
          onUserSubmit={submitOrderHandler}
        />
      )}
      <Card>
        {!isSubmitting && !didSubmit && cartModelContemt}
        {isSubmitting && isSubmittingModel}
        {didSubmit && !isSubmitting && didSubmitModel}
        {!isSubmitting && !didSubmit && errorModel}
      </Card>
    </section>
  );
};

export default MyCart;
