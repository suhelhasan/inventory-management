import React, { useEffect } from "react";
import Routing from "./routing/Routing";
import firebase from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { isLoggedIn, userDetails } from "./redux/actions/actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // console.log("hello hello hello hello", user);
        dispatch(isLoggedIn());
        let { displayName, email, photoURL } = user;
        dispatch(userDetails({ displayName, email, photoURL }));
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
