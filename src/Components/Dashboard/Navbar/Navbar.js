import React, { useState } from "react";
import styling from "./Navbar.module.css";
import { FiMenu, FiBell, FiInfo } from "react-icons/fi";
import { BiCaretDown, BiUserCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "../../../redux/actions/actions";
import { AiOutlinePoweroff } from "react-icons/ai";
import { IoMdArrowDropup } from "react-icons/io";
import firebase from "../../../firebase/firebase";
import { Redirect } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  let user = useSelector((state) => state.user);
  let isLogged = useSelector((state) => state.isLogged);
  let [showInfo, setShowInfo] = useState(false);
  const dispatch = useDispatch();

  // if (!isLogged) {
  //   return <Redirect to="signin" />;
  // }

  let logoutfromGoogle = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(isLoggedIn());
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
            <img src={user.photoURL} alt={user.displayName} />
            <p>{user.displayName}</p>
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
