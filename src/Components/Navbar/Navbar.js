import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn, userDetails } from "../../redux/actions/actions";
import firebase from "../../firebase/firebase";
import { Link } from "react-router-dom";
import styling from "./Navbar.module.css";
import { BsGraphUp } from "react-icons/bs";
// import { Link } from "react-router-dom";
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
        dispatch(userDetails({}));
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
              // notify();
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
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Navbar;
