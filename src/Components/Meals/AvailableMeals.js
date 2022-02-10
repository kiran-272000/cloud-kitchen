import React from "react";
import DUMMY_MEALS from "./dummy-meals";

import classes from "./AvailableMeals.module.css";
import { Card } from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((item) => {
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
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
