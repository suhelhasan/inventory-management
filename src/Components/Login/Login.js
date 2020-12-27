import React from "react";
import firebase from "../../firebase/firebase";
import icon from "../../assets/googleLogo.png";
import styling from "./Login.module.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import loginImage from "../../assets/signInPage.svg";

function Login() {
  let isLogged = useSelector((state) => state.isLogged);
  let shopDetails = useSelector((state) => state.shopDetails);
  // console.log("SHOP DETAILS", shopDetails);
  if (isLogged && shopDetails.shopName) {
    return <Redirect to="/dashboard" />;
  } else if (isLogged && !shopDetails.shopName) {
    return <Redirect to="/registerOptions" />;
  }

  let loginWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        const db = firebase.firestore();
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("User is already registered", doc.data());
            } else {
              db.collection("users")
                .doc(user.uid)
                .set({
                  name: user.displayName,
                  email: user.email,
                  photo: user.photoURL,
                  id: user.uid,
                })
                .then((docRef) => {
                  console.log("Welcome new user");
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
            }
          })
          .catch(() => {
            console.log("Error");
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styling.logInPage}>
      <div className={styling.logInPageText}>
        <img src={loginImage} alt="login" />
      </div>
      <div className={styling.logInPageActualSignIn}>
        <h2>
          Sign in to use <Link to="/">ShopManager</Link>, It is safe and secure.
        </h2>
        <div className={styling.googleSignIn} onClick={loginWithGoogle}>
          <img src={icon} alt="logo" />
          <p>Sign in with Google</p>
        </div>
        <p>
          Our management software is a inventory management platform that solves
          the problems that Shopkeepers and Customers deal with on a daily
          basis.
        </p>
        <p>Relax, It is always going to be free</p>
      </div>
    </div>
  );
}

export default Login;
