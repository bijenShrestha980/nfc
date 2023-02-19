import React from "react";

const Hamburger = ({ sidebarOpen, isOpen }) => {
  const handleAddClass = () => {
    if (isOpen) {
      sidebarOpen(false);
    } else {
      sidebarOpen(true);
    }
  };

  return (
    <div className="menu-toggle" onClick={handleAddClass}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hamburger;
