import { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import Model from "../../UI/Model";

const isEmpty = (value) => value.trim() === "";
const isPinCode = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isPinCode(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

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
          <input type="text" id="name" ref={nameInputRef} />
          {!formInputValidity.name && <p>Please Enter A Valid Name!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputValidity.street ? "" : classes.invalid
          }`}
        >
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
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
          <input type="text" id="postal" ref={postalInputRef} />
          {!formInputValidity.postalCode && <p>Please Enter A Postal Code!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputValidity.city ? "" : classes.invalid
          }`}
        >
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
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
