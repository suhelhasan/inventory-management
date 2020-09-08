import React, { useEffect } from "react";
import Routing from "./routing/Routing";
import firebase from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "./redux/actions/actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        dispatch(isLoggedIn());
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
