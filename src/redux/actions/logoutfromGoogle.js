// import React from "react";
// import firebase from "../../firebase/firebase";
// import { useDispatch } from "react-redux";
// import { isLoggedIn, userDetails } from "./actions";

// function LogOutfromGoogle() {
//   const dispatch = useDispatch();

//   (() => {
//     firebase
//       .auth()
//       .signOut()
//       .then(function () {
//         dispatch(isLoggedIn());
//         dispatch(userDetails({}));
//         console.log("Sign Out SuccessFull");
//       })
//       .catch(function (error) {
//         console.log("Sign Out Error");
//       });
//   })();
// }
// export default LogOutfromGoogle;
