import React from "react";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-16 w-full shadow-lg flex items-center">
      <img src={Logo} alt="Logo" className="h-16 w-42 p-2" />
      <ul className="flex mx-8">
        <li className="mr-8">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "selected-nav" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "selected-nav" : "")}
          >
            Favourites
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
