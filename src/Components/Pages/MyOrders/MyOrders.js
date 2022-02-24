import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import noOrderImage from "../../../Assets/empty_order.jpg";
import { Card } from "../../UI/Card";
import classes from "./MyOrders.module.css";
import OrderItem from "./OrderItem";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  // const [hasItem, setHasItem] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://cloud-kitchen-gk.herokuapp.com/api/kitchen/usercart",
          {
            method: "POST",
            body: JSON.stringify({
              token: window.sessionStorage.getItem("accessToken"),
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        let arr = [];
        data.order.map((item) => {
          return item.orderItems.map((orderedMeal) => {
            return arr.push(orderedMeal);
          });
        });
        setOrders(arr);
      } catch (err) {}
    }
    fetchData();
  }, []);

  const hasItem = orders.length > 0;

  const modalAction = (
    <div className={classes.actions}>
      <Link to="/">
        <button className={classes["button--alt"]}>Continue Shopping</button>
      </Link>
    </div>
  );

  const orderItems = (
    <ul className={classes["order-items"]}>
      {orders.map((item) => (
        <OrderItem
          orderDate={item.orderedAt}
          quantity={item.amount}
          name={item.name}
          price={item.price}
        />
      ))}
    </ul>
  );

  const orderModelContent = (
    <React.Fragment>
      {!hasItem && (
        <>
          <div className={classes["orderEmpty-msg"]}>
            <span>There are no recent orders to show!</span>
          </div>
          <div className={classes["order-image"]}>
            <img src={noOrderImage} alt="Your Order List is Empty" />
          </div>
        </>
      )}
      {hasItem && orderItems}
      {modalAction}
    </React.Fragment>
  );

  return (
    <section className={classes.orderpage}>
      <Card>{orderModelContent}</Card>
    </section>
  );
};

export default MyOrders;
