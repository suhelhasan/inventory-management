import React, { useEffect } from "react";
import Routing from "./routing/Routing";
import firebase from "./firebase/firebase";
import { useDispatch } from "react-redux";
import { isLoggedIn, userDetails } from "./redux/actions/actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("hello");

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, photoURL, uid } = user;
        // console.log("hello", user);

        dispatch(isLoggedIn());
        console.log("hello hello hello");
        const db = firebase.firestore();

        db.collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(userDetails(doc.data()));
              console.log("Document data:", doc.data());
              // alert("hello");
            } else {
              let id = uid;
              let name = displayName;
              let photo = photoURL;
              dispatch(userDetails({ name, photo, id, email }));

              console.log("No such document!");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
      } else {
        console.log("Signed Out");
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
