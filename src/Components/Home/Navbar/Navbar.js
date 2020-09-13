import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn, userDetails } from "../../../redux/actions/actions";
import firebase from "../../../firebase/firebase";
import { Link } from "react-router-dom";
import styling from "./Navbar.module.css";
import { BsGraphUp } from "react-icons/bs";
import { notify, ToastContainer } from "../../Notify/Notify";

function Navbar() {
  let loggedIn = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  let logoutfromGoogle = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        dispatch(isLoggedIn());
        dispatch(userDetails({}));
        console.log("Sign Out SuccessFull");
      })
      .catch(function (error) {
        console.log("Sign Out Error");
      });
  };
  return (
    <>
      <div className={styling.Navbar}>
        <div className={styling.logo}>
          <h2>
            <Link to="/">
              ShopManager <BsGraphUp className={styling.logoIcon} />
            </Link>
          </h2>
        </div>
        <div className={styling.navbarContent}>
          {loggedIn ? (
            <div
              className={styling.button}
              onClick={() => {
                logoutfromGoogle();
                notify("error", "Logged Out Successfully 😐");
              }}
            >
              Logout
            </div>
          ) : (
            <Link to="/signin" className="btn btn-primary">
              <div className={styling.button}>Sign In</div>
            </Link>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Navbar;
