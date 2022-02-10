import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountRef = useRef();
  const [isValid, setisValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredAmountInNumber = +enteredAmount;

    if (enteredAmount.trim() === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setisValid(false);
      return;
    }

    props.onAddToCart(enteredAmountInNumber);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!isValid && <p>Enter the amount between 1 and 5</p>}
    </form>
  );
};

export default MealItemForm;
