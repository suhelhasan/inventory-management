import React, { useEffect } from "react";
import firebase from "../firebase/firebase";
import icon from "../assets/googleLogo.png";
import styling from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedIn } from "../redux/actions/actions";
import { Redirect } from "react-router-dom";

function Login() {
  // let loggedIn = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  // const [isLogin, setIsLogin] = useState(false);
  let loggedIn = useSelector((state) => state.isLogged);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       console.log("Sign In");
  //       dispatch(isLoggedIn());
  //     } else {
  //       console.log("Sign Out");
  //       dispatch(isLoggedIn());
  //     }
  //   });
  // }, [dispatch]);

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
              console.log("Document data:", doc.data());
            } else {
              db.collection("users")
                .doc(user.uid)
                .set({
                  name: user.displayName,
                  email: user.email,
                  photo: user.photoURL,
                })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
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
    <>
      <div className={styling.googleSignIn} onClick={loginWithGoogle}>
        <img src={icon} alt="logo" />
        <p>Sign in with Google</p>
      </div>
    </>
  );
}

export default Login;
