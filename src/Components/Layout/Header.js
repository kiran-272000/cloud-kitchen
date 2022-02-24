import React from "react";
import { Fragment } from "react";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";

import image from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.sideMenuButton} onClick={props.onShowSideBar}>
          <HiMenu size={40} />
        </div>
        <Link to="/" className={classes.link}>
          <h1>Cloud Kitchen</h1>
        </Link>
        <HeaderCartButton showCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={image} alt="Delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
