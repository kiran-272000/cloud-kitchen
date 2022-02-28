import React, { useContext, useState } from "react";
import CartContext from "../../../Store/CartContext";

import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const [isfav, setIsfav] = useState(props.isFav);
  const cartCtx = useContext(CartContext);
  const price = `₹${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  const favHandler = async () => {
    try {
      const response = await fetch(
        "https://cloud-kitchen-gk.herokuapp.com/api/user/wishlist",
        {
          method: "POST",
          body: JSON.stringify({
            token: window.sessionStorage.getItem("accessToken"),
            mealId: props.id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong...");
      }
      setIsfav(!isfav);
    } catch (err) {}
  };

  const favButton = isfav ? (
    <MdFavorite fill="red" size={"30px"} />
  ) : (
    <MdOutlineFavoriteBorder size={"30px"} />
  );
  return (
    <li>
      <div className={classes.meals}>
        <div className={classes.wish}>
          <h3>{props.name}</h3>
          {props.isHeartVisible && (
            <label onClick={favHandler}>{favButton}</label>
          )}
        </div>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
