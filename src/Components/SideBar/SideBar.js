import React from "react";
import { SideBarData } from "./SideBarContent";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";

import classes from "./SideBar.module.css";
import { useHistory } from "react-router-dom";

const Sidebar = (props) => {
  const history = useHistory();
  const sideMenu = SideBarData.map((item, key) => {
    return (
      <li key={key} onClick={props.onClose}>
        <NavLink
          activeClassName={classes.active}
          to={item.link}
          exact={true}
          className={classes.sidebarItem}
        >
          <div className={classes.icon}>{item.icon}</div>
          <div className={classes.title}>{item.title}</div>
        </NavLink>
      </li>
    );
  });

  const headerContent = window.sessionStorage.getItem("isLogin")
    ? `Hi, ${window.sessionStorage.getItem("userName")}`
    : "Hi, Signin";

  const logoutHandler = () => {
    props.onLogout();
    props.onClose();
    history.push("/");
  };

  return (
    <React.Fragment>
      <div className={classes.sidebar}>
        <div className={classes.header}>
          <RiAccountCircleFill size="30px" />
          <h3>{headerContent}</h3>
          <div className={classes.headerIcon}>
            <HiMenu size={27} onClick={props.onClose} />
          </div>
        </div>
        <nav>
          <ul className={classes.sidebarList}>{sideMenu}</ul>
        </nav>
        <div className={classes.footer}>
          {window.sessionStorage.getItem("isLogin") && (
            <div className={classes.logout}>
              <button onClick={logoutHandler}>LogOut</button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
