import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import Hamburger from "../components/layout/Hamburger";
import { MainRoutes } from "../handler/Routes";

import searchIcon from "../assets/images/SVG/search.svg";
import mail from "../assets/images/SVG/mail.svg";
import messenger from "../assets/images/SVG/messenger.svg";
import chev from "../assets/images/SVG/chev.svg";
import { CSSTransition } from "react-transition-group";

const Header = ({
  sidebarOpen,
  isOpen,
  showSubMenu,
  rotates,
  setRotates,
  setShowSubMenu,
}) => {
  const location = useLocation();

  function signOut() {
    console.log("clicked");
    // appDispatch({ type: "signOut" });
    // history.push("/login");
  }
  function showMenu() {
    setShowSubMenu(!showSubMenu);
    //abinash change
    if (rotates === true) {
      setRotates(false);
    } else {
      setRotates(true);
    }
  }

  function handleMenuChange(name) {
    setRotates(false);
    setShowSubMenu(false);
    // appDispatch({ type: "activeMenu", value: name });
  }
  return (
    <div className="app-header">
      <div className="app-header-top">
        <div className="searchbox-container">
          <div className="input-group">
            <div className="input-group-append">
              <div className="icon-container">
                <img src={searchIcon} alt="" />
              </div>
            </div>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
        </div>
      </div>

      <div className="app-header-bottom">
        <div className="left">
          <Hamburger sidebarOpen={sidebarOpen} isOpen={isOpen} />
          <div className="text-box">
            <h2>PRO ACCOUNT</h2>
          </div>
        </div>
        <div className="right">
          <ul className="menu-primary-list">
            {MainRoutes.map((item, i) => (
              <li
                className={` ${
                  location.pathname === item.path ? "active" : ""
                } `}
                onClick={handleMenuChange}
                key={i}
              >
                <Link to={item.path}>
                  <div className="image-container">{item.icon}</div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="menu-secondary-list">
            {/* <li>
              <Link to="#">
                <div className="avatar-container">
                  <img src={avatar} alt="" />
                </div>
              </Link>
            </li> */}
            <li>
              <Link to="#">
                <div className="mail-container icon-container-small">
                  <img src={mail} alt="" />
                </div>
              </Link>
            </li>
            <li>
              <Link to="#">
                <div className="mail-container icon-container-small">
                  <img src={messenger} alt="" />
                </div>
              </Link>
            </li>
            <li>
              <div className="avatar-container" onClick={showMenu}>
                {/* <img
                  src={`${process.env.REACT_APP_BASE_URL}/images/${appState.userRoles.data.personal_information[0]?.image}`}
                  alt=""
                /> */}
              </div>

              <div className="text-box" onClick={showMenu}>
                {/* {`${appState.userRoles.data.personal_information[0]?.full_name}`} */}
              </div>
              <div
                className={`chev-icon-container icon-container-small ${
                  rotates === true ? "divRotate" : ""
                } `}
                onClick={showMenu}
              >
                <img src={chev} alt="" />
              </div>
              <CSSTransition
                timeout={330}
                in={showSubMenu}
                classNames="sub-menu-container"
                unmountOnExit
              >
                <div
                  className="sub-menu-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ul className="sub-menu">
                    <li onClick={(e) => e.stopPropagation()}>
                      <Link
                        to="/profile"
                        onClick={(e) => handleMenuChange("dashboard")}
                      >
                        Account
                      </Link>
                    </li>
                    <li onClick={(e) => e.stopPropagation()}>
                      <Link
                        to="/settings"
                        onClick={(e) => handleMenuChange("settings")}
                      >
                        Settings
                      </Link>
                    </li>
                    <li
                      onClick={(e) => e.stopPropagation()}
                      style={{ display: "inline-block" }}
                    >
                      <Link to="/" onClick={signOut}>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </CSSTransition>
            </li>
          </ul>
        </div>
      </div>
      {/* <ul className="menu-menu">
        <li>notification</li>
        <li>
          <ul className="sub-menu">
            <li>
              <Link to="/dashboard/profile">profile</Link>
            </li>
            <li>
              <Link to="/dashboard/settings">settings</Link>
            </li>
            <Link to="/login" onClick={signOut}>
              <li>Sign out</li>
            </Link>
          </ul>
        </li>
      </ul> */}
    </div>
  );
};

export default memo(Header);
