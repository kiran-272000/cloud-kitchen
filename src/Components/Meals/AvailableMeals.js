import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../Store/CartContext";
import classes from "./AvailableMeals.module.css";
import { Card } from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
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
              authorization: `token ${window.sessionStorage.getItem(
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

  const mealsList = cartCtx.availableMeals.map((item) => {
    const fav = wishListArray.includes(item.id);
    return (
      isDataFetched && (
        <MealItem
          id={item.id}
          key={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          isFav={fav}
          isHeartVisible={true}
        />
      )
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        {!cartCtx.loading && !cartCtx.error && <ul>{mealsList}</ul>}
        {!cartCtx.loading && cartCtx.error && (
          <h3 className={classes.message}>{cartCtx.error}</h3>
        )}
        {cartCtx.loading && <h3 className={classes.message}>Loading...</h3>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
