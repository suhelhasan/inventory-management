import React, { useEffect } from "react";
import Routing from "./routing/Routing";
import firebase from "./firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
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
  // let userDetailsLocal = useSelector((state) => state.userDetails);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, photoURL, uid } = user;
        dispatch(isLoggedIn());
        const db = firebase.firestore();

        // GET ALL SHOPS NAME
        db.collection("shops")
          .get()
          .then((da) => {
            // console.log(da.docs);
            let ans = da.docs.map((doc) => {
              return doc.data().shopDetails.shopName;
            });
            console.log(ans);
          });

        db.collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(userDetails(doc.data()));
              // updating shop data
              db.collection("shops")
                .doc(doc.data().shopName)
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
        // if (userDetailsLocal.shopName) {
        //   db.collection("shops")
        //     .doc(userDetailsLocal.shopName)
        //     .get()
        //     .then((doc) => {
        //       if (doc.exists) {
        //         dispatch(shopDetails(doc.data().shopDetails));
        //         // console.log("DOC DATA", doc.data());
        //         dispatch(salesChannelAction(doc.data().userSalesChannels));
        //         dispatch(salesItem(doc.data().products));
        //         dispatch(allCustomers(doc.data().customers));
        //       } else {
        //         console.log("No such document!");
        //       }
        //     })
        //     .catch(function (error) {
        //       console.log("Error getting document:", error);
        //     });
        // }
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
