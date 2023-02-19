import React from "react";
import { Link } from "react-router-dom";

const Announcement = () => {
  // const handleMenuClick = () => {
  //   appDispatch({ type: "activeMenu", value: "dashboard" });
  // }
  return (
    <>
      <h2>
        Announcement page is not implemented Yet, please go to
        <Link to="/dashboard">Dashboard</Link>
      </h2>
    </>
  );
};

export default Announcement;
