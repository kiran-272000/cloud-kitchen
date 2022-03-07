import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CartContext from "../../../Store/CartContext";
import classes from "../../Meals/AvailableMeals.module.css";
import { Card } from "../../UI/Card";
import MealItem from "../../Meals/MealItem/MealItem";
import empty from "../../../Assets/empty_wishlist.png";

const WishList = () => {
  const cartCtx = useContext(CartContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [wishListArray, setwishListArray] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://cloud-kitchen-gk.herokuapp.com/api/user/getwishlist",
          {
            headers: {
              Authorization: `token ${window.sessionStorage.getItem(
                "accessToken"
              )}`,
              "content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        setwishListArray(data.wishListArray);
        setIsDataFetched(true);
      } catch (err) {}
    }
    fetchData();
  }, []);

  const modalAction = (
    <div className={classes.actions}>
      <Link to="/">
        <button className={classes["button--alt"]}>Continue Shopping</button>
      </Link>
    </div>
  );
  const mealsList = cartCtx.availableMeals.map((item) => {
    const fav = wishListArray.includes(item.id);
    if (fav) {
      return (
        isDataFetched && (
          <MealItem
            id={item.id}
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            isFav={fav}
            isHeartVisible={false}
          />
        )
      );
    }
    return null;
  });

  const emptyWishlist = (
    <>
      <div className={classes["favEmpty-msg"]}>
        <span>There are no favourites to show!</span>
      </div>
      <div className={classes["fav-image"]}>
        <img src={empty} alt="Your Wish List is Empty" />
      </div>
      {modalAction}
    </>
  );

  return (
    <section className={classes.mealswishList}>
      <Card>
        {!cartCtx.loading && !cartCtx.error && wishListArray.length > 0 && (
          <>
            <ul>{mealsList}</ul>
            {modalAction}
          </>
        )}
        {wishListArray.length === 0 && emptyWishlist}
        {!cartCtx.loading && cartCtx.error && (
          <h3 className={classes.message}>{cartCtx.error}</h3>
        )}
        {cartCtx.loading && <h3 className={classes.message}>Loading...</h3>}
      </Card>
    </section>
  );
};

export default WishList;
