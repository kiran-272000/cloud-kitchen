import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import MyCart from "./Components/Pages/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import MyOrders from "./Components/Pages/MyOrders/MyOrders";
import Sidebar from "./Components/SideBar/SideBar";
import CartProvider from "./Store/CartProvider";
import Login from "./Components/User/Login";
import WishList from "./Components/Pages/MyWishList/WishList";

function App() {
  // const [openCart, setopenCart] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showLogin, setshowLogin] = useState(false);

  const sideMenuHandler = () => {
    setOpenSideMenu(!openSideMenu);
  };

  const showModelHandler = () => {
    setshowLogin(window.sessionStorage.getItem("isLogin"));
  };

  const logoutHandler = () => {
    setshowLogin(false);
    window.sessionStorage.clear();
    window.alert("Logged out Successfully!!!!");
  };

  return (
    <CartProvider>
      {openSideMenu && showLogin && (
        <Sidebar onClose={sideMenuHandler} onLogout={logoutHandler} />
      )}
      <Header onShowSideBar={sideMenuHandler} />
      {!showLogin ? (
        <Login onLogin={showModelHandler} />
      ) : (
        <main>
          <Switch>
            <Route exact path="/">
              <Meals />
            </Route>
            <Route path="/myorders">
              <MyOrders />
            </Route>
            <Route path="/mycart">
              <MyCart />
            </Route>
            <Route path="/mywishlist">
              <WishList />
            </Route>
          </Switch>
        </main>
      )}
    </CartProvider>
  );
}

export default App;
