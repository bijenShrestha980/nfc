import React, { memo } from "react";
import { Link, useLocation } from "react-router-dom";

import { MainRoutes } from "../handler/Routes";
import logo from "../assets/images/1x/logo-dashboard.png";
import affixlynk from "../assets/images/small-afflixlynk.png";

const Sidebar = () => {
  const location = useLocation();

  //   const handleMenuClick = () => {
  //     appDispatch({
  //       type: "activeMenu",
  //       value: e.target.attributes.getNamedItem("item-for").value,
  //     });
  //   };

  return (
    <>
      <div className="logo-container">
        <div className="image-container">
          <img src={logo} alt="" />
        </div>
        <div className="small-image-container">
          <img src={affixlynk} alt="" />
          <p>AL</p>
        </div>
      </div>
      <div className="sidebar-menu-container">
        <div className="header-box">
          <h2 className="mainH2">DASHBOARD</h2>
          <h2 className="smallH2">D B</h2>
        </div>
        <ul className="sidebar-menu-list">
          {MainRoutes.map((item, i) => {
            return (
              <li
                key={i}
                className={`sidebar-menu-item zoom-in ${
                  location.pathname === item.name ? "active" : ""
                } `}
              >
                <Link
                  to={item.path}
                  item-for={item.name}
                  //   onClick={handleMenuClick}
                >
                  <div className="icon-container">{item.icon}</div>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default memo(Sidebar);
