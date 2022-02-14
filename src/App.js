import React, { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Store/CartProvider";

function App() {
  const [openCart, setopenCart] = useState(false);
  // const [openSideMenu, setOpenSideMenu] = useState(false);

  const showCartHandler = () => {
    setopenCart(true);
  };
  const hideCartHandler = () => {
    setopenCart(false);
  };

  // const showSideMenuHandler = () => {
  //   setOpenSideMenu(true);
  // };
  // const hideSideMenuHandler = () => {
  //   setOpenSideMenu(false);
  // };
  return (
    <CartProvider>
      {openCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
