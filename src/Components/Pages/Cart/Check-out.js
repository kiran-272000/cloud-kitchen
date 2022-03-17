import React, { useState } from "react";
import useInput from "../../../hooks/use-input";
import classes from "./Checkout.module.css";
import Model from "../../UI/Model";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    valueChangeHandler: streetChangeHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    valueChangeHandler: postalCodeChangeHandler,
  } = useInput((value) => value.trim().length === 6);
  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    valueChangeHandler: cityChangeHandler,
  } = useInput((value) => value.trim() !== "");

  const confirmHandler = (event) => {
    event.preventDefault();
    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsVaild =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsVaild) {
      return;
    }

    props.onUserSubmit({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
    props.onCancel(false);
  };
  return (
    <Model>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div
          className={`${classes.control} ${
            formInputValidity.name ? "" : classes.invalid
          }`}
        >
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            onChange={nameChangeHandler}
            value={enteredName}
          />
          {!formInputValidity.name && <p>Please Enter A Valid Name!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputValidity.street ? "" : classes.invalid
          }`}
        >
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            onChange={streetChangeHandler}
            value={enteredStreet}
          />
          {!formInputValidity.street && (
            <p>Please Enter A Valid Street Name!</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formInputValidity.postalCode ? "" : classes.invalid
          }`}
        >
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            onChange={postalCodeChangeHandler}
            value={enteredPostalCode}
          />
          {!formInputValidity.postalCode && <p>Please Enter A Postal Code!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputValidity.city ? "" : classes.invalid
          }`}
        >
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            onChange={cityChangeHandler}
            value={enteredCity}
          />
          {!formInputValidity.city && <p>Please Enter A City Name!</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </Model>
  );
};

export default Checkout;
