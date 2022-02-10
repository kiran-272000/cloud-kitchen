import React, { useContext } from "react";
import CartItem from "./CartItem";
import CartContext from "../../Store/CartContext";
import Model from "../UI/Model";

import classes from "./Cart.module.css";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx);
  const hasItem = cartCtx.item.length > 0;

  const removeItemCart = (id) => {
    cartCtx.removeItem(id);
  };

  const addItemCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

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
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>
    </Model>
  );
};

export default Cart;
