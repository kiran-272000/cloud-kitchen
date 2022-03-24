import React, { useContext, useState, useEffect } from "react";
import CartContext from "../../Store/CartContext";
import classes from "./AvailableMeals.module.css";
import { Card } from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const cartCtx = useContext(CartContext);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [wishListArray, setwishListArray] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
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
      } catch (err) {
        seterror(err.message);
      }
      setisLoading(false);
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
        {!isLoading && !error && <ul>{mealsList}</ul>}
        {!isLoading && error && <h3 className={classes.message}>{error}</h3>}
        {isLoading && <h3 className={classes.message}>Loading...</h3>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
