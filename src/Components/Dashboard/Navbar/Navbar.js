import React from "react";
import styling from "./Navbar.module.css";
import { FiMenu, FiBell, FiInfo } from "react-icons/fi";
import { BiCaretDown } from "react-icons/bi";

function Navbar({ toggleSidebar }) {
  return (
    <div className={styling.Navbar}>
      <FiMenu className={styling.Menu} onClick={toggleSidebar} />
      <div className={styling.Details}>
        <FiInfo />
        <FiBell />
        <div className={styling.userProfile}>
          <BiCaretDown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
