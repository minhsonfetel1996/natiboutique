import React from "react";
import PropTypes from "prop-types";

const Burger = ({
  isClick,
  handleCatClick,
  handleBurgerClick,
  isTopMenu,
  isNav,
}) => {
  return (
    <div
      className={isClick ? "Burger toggle" : "Burger"}
      onClick={isNav ? handleBurgerClick : handleCatClick}
      style={
        isTopMenu && {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0",
          height: "auto",
          marginLeft: "5px",
        }
      }
    >
      <div className="line" />
      <div className="line" />
      <div className="line" />
    </div>
  );
};

Burger.propTypes = {
  isClick: PropTypes.bool,
  handleCatClick: PropTypes.func,
  handleBurgerClick: PropTypes.func,
  isTopMenu: PropTypes.bool,
  isNav: PropTypes.bool,
};

export default Burger;
