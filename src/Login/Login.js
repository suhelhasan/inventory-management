import React, { useEffect } from "react";
import firebase from "../firebase/firebase";
import icon from "../assets/googleLogo.png";
import styling from "./Login.module.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import loginImage from "../assets/signIn9.svg";

function Login() {
  let loggedIn = useSelector((state) => state.isLogged);

  if (loggedIn) {
    return <Redirect to="/dashboard" />;
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
              console.log("User is already registered");
            } else {
              db.collection("users")
                .doc(user.uid)
                .set({
                  name: user.displayName,
                  email: user.email,
                  photo: user.photoURL,
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
        {/* <div className={styling.logInPageTextHeading}>
          <h1>
            Welcome to <Link to="/">ShopManager</Link>
          </h1>
          <p>Built to make your work easier.</p>
        </div> */}
        <img src={loginImage} alt="login" />
      </div>
      <div className={styling.logInPageActualSignIn}>
        <h2>Sign in to use Shop Manager, It is safe and secure.</h2>
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
