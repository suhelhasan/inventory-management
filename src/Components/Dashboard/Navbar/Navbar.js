import React, { useState } from "react";
import styling from "./Navbar.module.css";
import { FiMenu, FiBell } from "react-icons/fi";
import { BiCaretDown } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
// import {
//   isLoggedIn,
//   userDetails,
//   shopDetails,
//   salesChannelAction,
//   salesItem,
//   allCustomers,
//   sellingHistory,
// } from "../../../redux/actions/actions";
import { AiOutlinePoweroff } from "react-icons/ai";
import firebase from "../../../firebase/firebase";

function Navbar({ toggleSidebar }) {
  let user = useSelector((state) => state.user);
  let [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  let logoutfromGoogle = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location.reload();
        console.log("Sign Out SuccessFull");
      })
      .catch(function (error) {
        console.log("Sign Out Error");
      });
  };

  return (
    <div className={styling.Navbar}>
      <FiMenu className={styling.Menu} onClick={toggleSidebar} />
      <div className={styling.Details}>
        {/* <FiInfo /> */}
        <FiBell className={styling.sideIcon} />
        <div className={styling.userProfileDetails}>
          <div
            className={styling.userProfile}
            onClick={() => setShowInfo(!showInfo)}
          >
            <img src={user.photo} alt={user.name} />
            <p>{user.name}</p>
            <BiCaretDown className={styling.downArrow} />
          </div>
          {showInfo ? (
            <div className={styling.userProfileInfo}>
              <div className={styling.userProfileInfoIcon}></div>
              <div className={styling.userProfileInfoInner}>
                <p>{user.email}</p>
                <p onClick={() => logoutfromGoogle()}>
                  <AiOutlinePoweroff /> Logout
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
