import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../../Store/CartContext";
import classes from "../../Meals/AvailableMeals.module.css";
import { Card } from "../../UI/Card";
import MealItem from "../../Meals/MealItem/MealItem";

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
            method: "POST",
            body: JSON.stringify({
              token: window.sessionStorage.getItem("accessToken"),
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setwishListArray(data.wishListArray);
        setIsDataFetched(true);
      } catch (err) {}
    }
    fetchData();
  }, []);

  console.log(wishListArray);

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
  });
  return (
    <section className={classes.mealswishList}>
      <Card>
        {!cartCtx.loading && !cartCtx.error && wishListArray.length > 0 && (
          <ul>{mealsList}</ul>
        )}
        {wishListArray.length === 0 && <h2>WishList is Empty</h2>}
        {!cartCtx.loading && cartCtx.error && (
          <h3 className={classes.message}>{cartCtx.error}</h3>
        )}
        {cartCtx.loading && <h3 className={classes.message}>Loading...</h3>}
      </Card>
    </section>
  );
};

export default WishList;
