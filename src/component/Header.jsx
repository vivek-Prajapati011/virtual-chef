import React from "react";
import logo from "../assets/chef.jpg"
const Header = () => {
  return (
    <>
    <header>
      <div className="brand">
        <img src={logo} alt="Chef  logo" className="brand__logo" />
        <span className="brand__name">virtual Chef</span>
      </div>
    </header>
    </>
  );
};
export default Header;
