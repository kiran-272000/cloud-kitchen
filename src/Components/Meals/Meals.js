import React, { Fragment } from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  const addMovieHandler = async () => {
    await fetch("https://cloud-kitchen-gk.herokuapp.com/api/kitchen/addmeals", {
      method: "POST",
      body: JSON.stringify({
        id: "6",
        name: "corn",
        description: "American, raw, corn",
        price: 20.99,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
      <button onClick={addMovieHandler}>add Movie</button>
    </Fragment>
  );
};

export default Meals;
