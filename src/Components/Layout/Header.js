import React from "react";
import { Fragment } from "react";
// import { HiMenu } from "react-icons/hi";

import image from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        {/* <div className={classes.sideMenuButton} onClick={props.onShowSideMenu}>
          <HiMenu size={40} />
        </div> */}
        <h1>Cloud Kitchen</h1>
        <HeaderCartButton showCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={image} alt="Delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
