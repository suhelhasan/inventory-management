import React, { useEffect } from "react";
import Routing from "./routing/Routing";
import firebase from "./firebase/firebase";
import { useDispatch } from "react-redux";
import {
  isLoggedIn,
  userDetails,
  salesChannelAction,
  salesItem,
  allCustomers,
  shopDetails,
} from "./redux/actions/actions";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, photoURL, uid } = user;

        dispatch(isLoggedIn());
        // console.log("hello hello hello");
        const db = firebase.firestore();

        db.collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(userDetails(doc.data()));
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

        db.collection("shops")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(shopDetails(doc.data().shopDetails));
              // console.log("DOC DATA", doc.data());
              dispatch(salesChannelAction(doc.data().userSalesChannels));
              dispatch(salesItem(doc.data().products));
              dispatch(allCustomers(doc.data().customers));
            } else {
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
