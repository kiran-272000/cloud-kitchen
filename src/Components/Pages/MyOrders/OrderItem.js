import React from "react";

import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;
  return (
    <li className={classes["order-item"]}>
      <div>
        <p>{`Ordered at ${props.orderDate}`}</p>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.quantity}</span>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
