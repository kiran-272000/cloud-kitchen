import React, { useContext, useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import CartContext from "../../Store/CartContext";

import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const [btnisHighlighted, setbtnisHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberCartItem = cartCtx.item.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const { item } = cartCtx;

  const btnClasses = `${classes.button} ${
    btnisHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (item.length === 0) {
      return;
    }
    setbtnisHighlighted(true);

    const timer = setTimeout(() => {
      setbtnisHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [item]);

  return (
    <Link to="/mycart" className={classes.link}>
      <button className={btnClasses}>
        <span className={classes.icon}>
          <BsFillCartFill size={25} />
        </span>
        {numberCartItem !== 0 && (
          <span className={classes.badge}>{numberCartItem}</span>
        )}
      </button>
    </Link>
  );
};

export default HeaderCartButton;
