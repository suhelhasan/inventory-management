import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "../../redux/actions/actions";
import firebase from "../../firebase/firebase";
import { Link } from "react-router-dom";
import styling from "./Navbar.module.css";
import { BsGraphUp } from "react-icons/bs";
// import { SiGraphcool } from "react-icons/si";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const notify = () =>
//   toast.warn("Logged Out Successfully 😐", {
//     position: "top-right",
//     autoClose: 4000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     backgroundColor: "red",
//   });

function Navbar() {
  let loggedIn = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

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
      <div className={styling.logo}>
        <h2>
          ShopManager <BsGraphUp className={styling.logoIcon} />{" "}
        </h2>
      </div>
      <div className={styling.navbarContent}>
        {loggedIn ? (
          <div
            className={styling.button}
            onClick={() => {
              logoutfromGoogle();
              // notify();
            }}
          >
            Logout
          </div>
        ) : (
          <div className={styling.button}>
            <Link to="/signin" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Navbar;
