import React, { useEffect, useCallback, useState } from "react";
// import DUMMY_MEALS from "./dummy-meals";

import classes from "./AvailableMeals.module.css";
import { Card } from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [availableMeals, setavailableMeals] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const mealsHandler = useCallback(async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        "https://cloud-kitchen-gk.herokuapp.com/api/kitchen/meals"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong...");
      }

      const data = await response.json();

      const meals = data.data.meals.map((meal) => {
        return {
          id: meal.id,
          name: meal.name,
          description: meal.description,
          price: meal.price,
        };
      });
      setavailableMeals(meals);
    } catch (err) {
      seterror(err.message);
    }
    setisLoading(false);
  }, []);

  useEffect(() => {
    mealsHandler();
  }, [mealsHandler]);

  const mealsList = availableMeals.map((item) => {
    return (
      <MealItem
        id={item.id}
        key={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
      />
    );
  });
  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !error && <ul>{mealsList}</ul>}
        {!isLoading && error && <h3>{error}</h3>}
        {isLoading && <h3>Loading...</h3>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
