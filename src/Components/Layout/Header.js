import React from "react";
import { Fragment } from "react";

import image from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>MealsReady</h1>
        <HeaderCartButton showCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={image} alt="Delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
